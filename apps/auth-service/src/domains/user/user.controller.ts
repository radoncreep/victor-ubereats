import { DatabaseInterface } from "ubereats-types";
import { Request, Response, NextFunction } from "express";

import { UserSchema } from "./user.schema";


export class UserController {
    constructor(private readonly db: DatabaseInterface<UserSchema>) {}

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        return res.send(req.body);
    }
}