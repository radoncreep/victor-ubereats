import bcrypt from "bcryptjs";

import { PasswordServiceInterface } from "../../types";


export class PasswordService implements PasswordServiceInterface {
    private readonly hasher = bcrypt;

    async encrypt(password: string) {
        try {
            const salt = await this.hasher.genSalt(10);
            const hashedPassword = this.hasher.hash(password, salt);
    
            return hashedPassword;
        } catch (error) {
            throw new Error("Server error");
        }
    }

    async verify(password: string, hashedPassword: string) {
        try {
            const isMatched = await this.hasher.compare(password, hashedPassword);
            return isMatched;
        } catch (error) {
            throw new Error("Server Error: Pwd Service")
        }
    }
}