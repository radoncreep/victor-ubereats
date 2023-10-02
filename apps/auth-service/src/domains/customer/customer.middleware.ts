import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import { customers } from "./customer.schema";
import { DeliveryAddress } from "ubereats-types";


const insertUserSchema = createInsertSchema(customers, {
    firstname: (schema) => schema.firstname.nonempty().trim().min(3),
    lastname: (schema) => schema.lastname.nonempty().trim().min(3),
    email: (schema) => schema.email.email(),
    phone: (schema) => schema.phone.nonempty().trim().max(11).min(10),
    password: (schema) => schema.password.nonempty().min(4),
    // deliveryAddress: z.infer()
})

export function customerValidationPipe(req: Request, res: Response, next: NextFunction) {
    try {
        insertUserSchema
            .pick({ 
                firstname: true,
                lastname: true,
                email: true,
                phone: true,
                password: true
            })
            .parse(req.body);
        
        next();
    } catch (error) {
        return next(error);
    }
}

export function validatePhonePipe(req: Request, res: Response, next: NextFunction) {
    try {
        const { phone, country_code, country } = req.body;
        // const result = insertUserSchema.pick({ phone: true }).parse(req.body);
        if (!phone || !country_code || !country) {
            const error = new Error();
            error.message = "Invalid Request";
            throw error;
        }
        next();
    } catch (error) {
        next(error);
    }
}