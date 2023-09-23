import { DatabaseInterface } from "ubereats-types";

import { CustomerSchema, NewCustomerSchema } from "./customer.schema";
import { NewUserSchema } from "../user/user.schema";

export type ICustomerRepository = {
    createCustomerWithUser(customer: NewCustomerSchema, user: NewUserSchema): Promise<NewCustomerSchema>;
} & Omit<DatabaseInterface<CustomerSchema>, "create">;