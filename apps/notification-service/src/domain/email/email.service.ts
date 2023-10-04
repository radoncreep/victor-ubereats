import {
    EmailPayload, 
    EmailServiceInterface
} from "./types";


export class EmailService implements EmailServiceInterface {
    constructor() {}

    verifyEmail(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    sendEmail(payload: EmailPayload ): void {
        throw new Error("Method not implemented.");
    }
}