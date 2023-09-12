import { DatabaseInterface, UserRoles } from "ubereats-types";
import { Request, Response, NextFunction } from "express";
import { v4 as uuid4 } from "uuid";

import { CustomerSchema, NewCustomerSchema } from "./customer.schema";
import { PasswordService } from "../../features/password/password.service";

export type NewCustomerReqPayload = Omit<NewCustomerSchema, "customerId">;

export class CustomerController {
    constructor(
        private readonly db: DatabaseInterface<CustomerSchema>,
        private passwordService: PasswordService
    ) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body as NewCustomerReqPayload;

        try {     
            const existingCustomer = await this.db.getOne!(payload.email);
    
            if (existingCustomer) throw new Error("Already existing user.");

            const hashedPassword = await this.passwordService.encrypt(payload.password);
            const customerId = uuid4();

            const {password, ...newCustomer} = await this.db.create({ 
                ...payload,
                customerId, 
                password: hashedPassword,
                paymentCards: [],
                deliveryAddress: payload.deliveryAddress || [],
                role: UserRoles.Customer
            });

            return res.status(201).json({ success: true, payload: newCustomer });
        } catch (error) {
            next(error);
        }   
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {

    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {

    }
    
    getOneUser = async (req: Request, res: Response, next: NextFunction) => {

    }

    getUsers = async (req: Request, res: Response, next: NextFunction) => {

    }
    
    deactivateUser = async (req: Request, res: Response, next: NextFunction) => {

    }
}