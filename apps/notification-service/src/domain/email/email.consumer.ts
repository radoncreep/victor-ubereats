import { EmailPayloadCommand } from "mq-service-pkg/src/constants";
import { QueueMessageHandlerInterface } from "../../services/events/consumer.interface";
import { EmailServiceInterface } from "./types";
import { EmailPayload, Message } from "mq-service-pkg";


export class EmailQueueMessageHandler implements QueueMessageHandlerInterface {
    readonly bindingKey: string = EmailPayloadCommand.SendRegistrationStatus;

    constructor(private emailService: EmailServiceInterface) {}

    handleMessage(message: Message<EmailPayload>): void {
        console.log({ message })
        const { payload: { sender, receipient, emailOptions} } = message;
        
        if (!sender.email || !receipient.email || !emailOptions.content) {
            throw new Error("Invalid SMS Payload");
        }

        this.emailService.sendEmail(message.payload);
    }
}