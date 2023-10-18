import Mailjet from "node-mailjet";
import { EmailServiceInterface } from "./types";
import { EmailPayload } from "mq-service-pkg";


export class EmailService implements EmailServiceInterface {
    protected mailjet = new Mailjet({
        apiKey: process.env.MJ_APIKEY_PUBLIC,
        apiSecret: process.env.MJ_APIKEY_PRIVATE
    });

    constructor() {}

    async sendEmail(payload: EmailPayload): Promise<void> {
        const { receipient, sender, emailOptions } = payload;
        const subject = emailOptions.subject;
        const text = emailOptions.content;
        const htmlBody = `<html><p>${text}</p></html>`;
        const response = await this.mailjet.post('send', { version: 'v3.1' })
            .request({
                Messages: [{
                    From: {
                        Email: sender.email,
                        Name: "ubereats"
                    },
                    To: [{
                        Email: receipient.email,
                        Name: "ubereats newbie"
                    }],
                    Subject: subject,
                    TextPart: text,
                    HTMLPart: htmlBody
                }]
            });
        
        console.log(response);
    }
}