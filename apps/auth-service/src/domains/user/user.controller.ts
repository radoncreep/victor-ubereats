import { DatabaseInterface, UserRoles } from "ubereats-types";
import { Request, Response, NextFunction } from "express";
import { v4 as uuid4 } from "uuid";

// import { NewUserSchema, UserSchema } from "./user.schema";
import { UserDatabaseInterface } from "./user.repository";
import { NewCustomerSchema } from "../customer/customer.schema";


export class UserController {
    constructor(
        // private readonly db: UserDatabaseInterface<UserSchema>
    ) {}

    // createUser = async (req: Request, res: Response, next: NextFunction) => {
    //     const payload = req.body as NewUserSchema;
    //     const role = payload.role;

    //     try {     
    //         const existingUser = await this.db.getOne!(payload.email);
    
    //         if (existingUser) throw new Error("Already existing user.");

    //         if (role === UserRoles.Customer) {
    //             const customerPayload: NewCustomerSchema = {
    //                 ...payload,
    //                 customerId: "",
    //                 deliveryAddress: [],
    //                 // userId: ""
    //             }
    //             // const result = await this.db.create();

    //             // return res.status(201).json({ success: true, payload: result });
    //         }


    //         return res.status(201).json({ success: true, payload: [] });
    //     } catch (error) {
    //         next(error);
    //     }   
    // }

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