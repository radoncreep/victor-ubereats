import { QueueMessageHandlerInterface } from "../../services/events/consumer.interface";
import { SmsServiceInterface } from "./types";


export class SmsQueueMessageHandler implements QueueMessageHandlerInterface {
    readonly bindingKey: string = "sms";

    constructor(private smsService: SmsServiceInterface) {}

    handleMessage(message: any): void {
        console.log({ message })
        const { payload: { phoneNumber, messageBody } } = message;
        
        if (!phoneNumber || !messageBody) {
            throw new Error("Invalid SMS Payload");
        }

        this.smsService.sendMessage({ phoneNumber, body: messageBody });
    }
}