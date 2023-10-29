import { SmsOtpPayload, SmsPayloadCommand, SmsQueueMessage } from "ubereats-types";

import { QueueMessageHandlerInterface } from "../../services/events/consumer.interface";
import { SmsServiceInterface } from "./types";


export class SmsQueueMessageHandler implements QueueMessageHandlerInterface {
    readonly bindingKey: string = SmsPayloadCommand.SendOtp;

    constructor(private smsService: SmsServiceInterface) {}

    // TODO: Set enum of SMS and types for SMS
    handleMessage(message: SmsQueueMessage<SmsOtpPayload>): void {
        const { payload: {customerPhone, oneTimePassword} } = message;
        
        if (!customerPhone) {
            throw new Error("Invalid SMS Payload");
        }

        const messageBody = `Use code ${oneTimePassword} to verify Ubereats Account.`;

        this.smsService.sendMessage({ phoneNumber: customerPhone, body: messageBody });
    }
}