import { Request, Response, NextFunction } from "express";
import { v4 as uuid4 } from "uuid";
import { 
    DatabaseInterface, 
    UserRoles, 
    EmailQueueMessageSubject, 
    EmailQueueMessage, 
    CreateAccountEmailPayload,
    SmsQueueMessage,
    SmsPayloadCommand,
    SmsOtpPayload
} from "ubereats-types";

import { CustomerSchema, NewCustomerSchema } from "./customer.schema";
import { PasswordService } from "../../services/password/password.service";
import { ITokenManager } from "../../services/jwt/jwt.interface";
import { OneTimePasswordInterface } from "../../services/oneTimePassword/otp.interface";
import { PhoneInterface } from "../../services/phone/phone.interface";
import { CacheInterface } from "ubereats-cache-pkg";
import { AMQProducer } from "../../services/events/producer/producer";


export type NewCustomerReqPayload = Omit<NewCustomerSchema, "customerId">;

export class CustomerController {
    constructor(
        private readonly db: DatabaseInterface<CustomerSchema>,
        private readonly passwordService: PasswordService,
        private readonly tokenService: ITokenManager,
        private readonly phoneService: PhoneInterface,
        private readonly otpService: OneTimePasswordInterface,
        private readonly cacheService: CacheInterface,
        private readonly mqService: AMQProducer
    ) {}

    submitPhone = async (req: Request, res: Response, next: NextFunction) => {
        console.log("BODY ", req.body)
        const { countryCode, localNumber } = req.body as Record<string, string>;

        if (!countryCode || !localNumber) {
            throw new Error("Invalid requests.")
        }

        const validPhone = this.phoneService.createValidPhone({ countryCode, localNumber });

        const oneTimePassword = +this.otpService.generate({ length: 4, pattern: "numeric" });

        const result = await this.cacheService.set(validPhone, oneTimePassword, {
            expiry: '30000'
        });

        if (!result) throw new Error("Server Error: Cache");
 
        // publish message to the notification service attaching the routing key and message content(country code + phone token) 
        const messageBody = `Use code ${oneTimePassword} to verify Ubereats Account.`;
        const message = { phoneNumber: validPhone, messageBody };
        this.mqService.publishMessage<SmsQueueMessage<SmsOtpPayload>>({
            subject: SmsPayloadCommand.SendOtp,
            timestamp: new Date(),
            messageType: "command",
            producer: "auth",
            consumer: "notification",
            payload: {
                customerPhone: validPhone,
                oneTimePassword,
            },
        });

        return res.json({ success: true, payload: result });
    }

    verifyPhone = async (req: Request, res: Response, next: NextFunction) => {
        const { phoneNumber, oneTimePassword } = req.body;

        if (!phoneNumber || !oneTimePassword) {
            throw new Error("Invalid requests");
        }

        const cachedOtp = await this.cacheService.get(phoneNumber);

        if (oneTimePassword !== cachedOtp) {
            return res.status(400).json({ success: false, error: "Incorrect code."});
        }

        this.cacheService.delete(phoneNumber);

        return res.json({ success: true, payload: phoneNumber });
    }


    submitEmail = async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;

        try {
            this.mqService.publishMessage<EmailQueueMessage<CreateAccountEmailPayload>>({
                subject: EmailQueueMessageSubject.CreateAccount,
                timestamp: undefined,
                messageType: "query",
                payload: {
                    verificationToken: "",
                    receipient: email
                },
                producer: "",
                consumer: ""
            })
        } catch (error) {
            console.log({ error })
        }

        return res.json({ success: true, payload: null });
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body as NewCustomerReqPayload;

        try {     
            const existingCustomer = await this.db.getOne!(payload.email);
    
            if (existingCustomer) throw new Error("Already existing user.");

            const customerId = uuid4();
            const hashedPassword = await this.passwordService.encrypt(payload.password);

            const {password, ...newCustomer} = await this.db.create({ 
                ...payload,
                customerId, 
                password: hashedPassword,
                paymentCards: [],
                deliveryAddress: payload.deliveryAddress || [],
                role: UserRoles.Customer
                // set status to unverified
            });

            // send an email
            // or notification or both (asynchronously)

            const accessToken = this.tokenService.createAccessToken(newCustomer);
            const refreshToken = this.tokenService.createRefreshToken({
                customerId: newCustomer.customerId, 
                email: newCustomer.email
            });
  
            return res
                .status(201)
                .json({ success: true, payload: {accessToken, refreshToken} });
        } catch (error) {
            next(error);
        }   
    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        const { customerId } = req.body as Record<"customerId", CustomerSchema["customerId"]>;

        try {
            const result = await this.db.getById(customerId);
    
            if (!result) throw new Error("Invalid ID");
    
            const {password, ...user} = result;
    
            return res.json({
                success: true,
                payload: user
            });
        } catch (error) {
            return next(error);
        }
    }
    
    getOneUser = async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;

        try {     
            const result = await this.db.getById(payload.email || payload.customerId);
    
            if (!result) throw new Error("Invalid ID");
    
            const {password, ...user} = result;
    
            return res.json({
                success: true,
                payload: user
            });
        } catch (error) {
            return next(error);
        }
    }

    getUsers = async (req: Request, res: Response, next: NextFunction) => {

    }
    
    deactivateUser = async (req: Request, res: Response, next: NextFunction) => {
        
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {

    }
}