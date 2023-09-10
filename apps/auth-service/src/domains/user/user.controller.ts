import { DatabaseInterface, UserRoles } from "ubereats-types";
import { Request, Response, NextFunction } from "express";

import { NewUserSchema, UserSchema } from "./user.schema";
import { PasswordServiceInterface } from "../../types";


export class UserController {
    constructor(
        private readonly db: DatabaseInterface<UserSchema>,
        private readonly passwordService: PasswordServiceInterface
    ) {}

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        const newUserPayload = req.body as NewUserSchema;

        try {     
            const existingUser = await this.db.getOne!(newUserPayload.email);
    
            if (existingUser) throw new Error("Already existing user.");

            const hashedPassword = await this.passwordService.encrypt(newUserPayload.password);

            const result = await this.db.create({
                ...newUserPayload,
                payment_details: null,
                role: UserRoles.Customer,
                password: hashedPassword,
            });

            return res.status(201).json({ success: true, payload: result });
        } catch (error) {
            next(error);
        }   
    }
}