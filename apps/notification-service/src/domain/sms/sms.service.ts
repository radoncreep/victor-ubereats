import tw from "twilio";
import Twilio from "twilio/lib/rest/Twilio";

import { SmsPayload, SmsServiceInterface } from "./types";


export class TwilioSmsServce implements SmsServiceInterface {
    private readonly baseUrl = "https://verify.twilio.com/v2/";
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

    async verifyPhone(phone: string): Promise<string> {
        // const verification = await this.smsClient.verify.v2.services(this.accountSID)
        //     .verifications
        //     .create({ to: phone, channel: 'sms' });
        
        // if (verification.status !== "200") {
        //     throw new Error("failed to send stuff.")
        // }

        // verification.
        return "";
    }

    async sendMessage(payload: SmsPayload): Promise<void> {
        const result = await this.smsClient.messages.create({
            body: payload.emailOptions.content,
            from: this.clientNumber,
            to: payload.receipient.phone,
        });

        if (result.status === "failed") {
            throw new Error(result.errorMessage || "Failed to deliver message.");
        }
    }
}