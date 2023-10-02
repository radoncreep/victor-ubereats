import { DatabaseInterface, UserRoles } from "ubereats-types";
import { Request, Response, NextFunction } from "express";
import { v4 as uuid4 } from "uuid";

import { CustomerSchema, NewCustomerSchema } from "./customer.schema";
import { PasswordService } from "../../services/password/password.service";
import { ITokenManager } from "../../services/jwt/jwt.interface";


export type NewCustomerReqPayload = Omit<NewCustomerSchema, "customerId">;

export class CustomerController {
    constructor(
        private readonly db: DatabaseInterface<CustomerSchema>,
        private passwordService: PasswordService,
        private tokenService: ITokenManager,
    ) {}

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

            const accessToken = this.tokenService.sign(newCustomer);
            const refreshToken = this.tokenService.sign({
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

    submitPhone = async (req: Request, res: Response, next: NextFunction) => {
        // remember to create validation for this to ensure what's derived from the req is what's expected... right
        // validate phone, country code etc use some api service to validate further
        const { countryCode, localNumber: localNumberFromBody } = req.body as Record<string, string>;

        // generate one time password for phone
        
        // store the phone and otp in a cache, for validation in future requests 
        // publish message to the notification service attaching the routing key and message content(country code + phone token) 



    }

    getUsers = async (req: Request, res: Response, next: NextFunction) => {

    }
    
    deactivateUser = async (req: Request, res: Response, next: NextFunction) => {
        
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {

    }
}