import Mailjet from "node-mailjet";

import { BuiltEmailPayload, IResponse } from "../types";


export interface STMPService {
    send(email: BuiltEmailPayload): Promise<IResponse>;
}

export class MailjetSMTPService implements STMPService {
    protected mailjet = new Mailjet({
        apiKey: process.env.MJ_APIKEY_PUBLIC,
        apiSecret: process.env.MJ_APIKEY_PRIVATE
    });


    async send(email: BuiltEmailPayload) {
        const { receipient, sender, subject, body  } = email;
       
        const { response } = await this.mailjet.post('send', { version: 'v3.1' })
            .request({
                Messages: [{
                    From: {
                        Email: sender,
                        Name: "ubereats"
                    },
                    To: [{
                        Email: receipient,
                        Name: "ubereats newbie"
                    }],
                    Subject: subject,
                    // TextPart: body,
                    HTMLPart: body
                }]
            });
        
        return { success: response.status === 200 };
    }
}