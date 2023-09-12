import { NewCustomerSchema } from "./domains/customer/customer.schema";

export interface PasswordServiceInterface {
    encrypt(password: string): Promise<string>;
    verify(password: string, hashedPassword: string): Promise<boolean>;
}

export type UnsignedPayload = Record<string, any>;
export type SignedPayload = string;
export interface ITokenManager {
    sign(payload: UnsignedPayload): SignedPayload;
    verify(payload: SignedPayload): UnsignedPayload;
}