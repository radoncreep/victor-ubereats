import { QueueMessageHandlerInterface } from "../../services/events/consumer.interface";
import { EmailServiceInterface } from "./types";


export class EmailQueueMessageHandler implements QueueMessageHandlerInterface {
    readonly bindingKey: string = "email";

    constructor(private smsService: EmailServiceInterface) {}

    handleMessage(message: any): void {
        console.log({ message })
        const { payload: { phoneNumber, messageBody } } = message;
        
        if (!phoneNumber || !messageBody) {
            throw new Error("Invalid SMS Payload");
        }

        // this.smsService.sendEmail({ phoneNumber, body: messageBody });
    }
}