import { SmsPayloadCommand } from "mq-service-pkg/src/constants";
import { QueueMessageHandlerInterface } from "../../services/events/consumer.interface";
import { SmsServiceInterface } from "./types";
import { Message, SmsPayload } from "mq-service-pkg";


export class SmsQueueMessageHandler implements QueueMessageHandlerInterface {
    readonly bindingKey: string = SmsPayloadCommand.SendOtp;

    constructor(private smsService: SmsServiceInterface) {}

    handleMessage(message: Message<SmsPayload>): void {
        console.log({ message })
        const { payload: {customerPhone, oneTimePassword} } = message;
        
        if (!customerPhone) {
            throw new Error("Invalid SMS Payload");
        }

        const messageBody = `Use code ${oneTimePassword} to verify Ubereats Account.`;

        this.smsService.sendMessage({ phoneNumber: customerPhone, body: messageBody });
    }
}