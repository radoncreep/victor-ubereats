import { EmailPayload, EmailServiceInterface } from "./types";


export class EmailService implements EmailServiceInterface {
    constructor() {}

    sendEmail(payload: EmailPayload ): void {
        throw new Error("Method not implemented.");
    }
}