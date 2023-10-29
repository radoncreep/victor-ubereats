import tw from "twilio";
import Twilio from "twilio/lib/rest/Twilio";

import { SmsPayload, SmsServiceInterface } from "./types";


export class TwilioSmsServce implements SmsServiceInterface {
    private readonly accountSID = process.env.TWILIO_ACCOUNT_SID as string;
    private readonly authToken = process.env.TWILIO_AUTH_TOKEN as string;
    private readonly clientNumber = process.env.TWILIO_SMS_NUMBER as string;
    private readonly smsClient: Twilio;
    
    constructor() {
        this.smsClient = tw(this.accountSID, this.authToken, {
            autoRetry: true,
            maxRetries: 2,
        });
    }

    async sendMessage(payload: SmsPayload) {
        console.log("PHONE NUMBER ", payload.phoneNumber)
        try {
            const result = await this.smsClient.messages.create({
                from: this.clientNumber,
                to: payload.phoneNumber,
                body: payload.body
            });
            // console.log(result)
    
            if (result.status === "failed") return { success: false };
        } catch (error) {
            console.log("TWILIO ERROR: ", error)
        }
        return { success: true };
    }
}