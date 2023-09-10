import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

import { users } from "./user.schema";
import { UserRoles } from "ubereats-types";


const insertUserSchema = createInsertSchema(users, {
    firstname: (schema) => schema.firstname.nonempty().trim().min(3),
    lastname: (schema) => schema.lastname.nonempty().trim().min(3),
    email: (schema) => schema.email.email(),
    phone: (schema) => schema.phone.nonempty().trim().max(11).min(10),
    password: (schema) => schema.password.nonempty().min(4),
});

export function userValidationPipe(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body;

    try {
        insertUserSchema
            .pick({ 
                firstname: true,
                lastname: true,
                email: true,
                phone: true,
                password: true
            })
            .parse(newUser);
        
        next();
    } catch (error) {
        return next(error);
    }
}