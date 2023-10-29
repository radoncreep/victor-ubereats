
import { createSignEmailTemplate } from "../templates/signup";
import { BaseEmailPayload, BuiltEmailPayload, EmailBuilder, EmailQueueMessageSubject } from "../types";


export class CreateAccountEmailBuilder implements EmailBuilder {
    readonly _builderName: EmailQueueMessageSubject = EmailQueueMessageSubject.CreateAccount;

    public buildEmail(mailObject: BaseEmailPayload): BuiltEmailPayload {
        let { subject, sender, body } = mailObject;

        if (!process.env.SMTP_SENDER) throw new Error("NO EMAIL SENDER.");
            
        sender = sender || process.env.SMTP_SENDER;
        subject = subject || "Welcome to Ubereats";
        body = createSignEmailTemplate({ 
            sender, 
            subject, 
            receipient: mailObject.receipient
        });
       
        return {
            subject,
            receipient: mailObject.receipient,
            sender,
            body,
        }
    }

    get builderName(): string {
        return this._builderName;
    }
}