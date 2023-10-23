import { EmailPayloadCommand } from "mq-service-pkg/src/constants";
import { QueueMessageHandlerInterface } from "../../services/events/consumer.interface";
import { EmailServiceInterface } from "./types";
import { EmailPayload, Message } from "mq-service-pkg";


export class EmailQueueMessageHandler implements QueueMessageHandlerInterface {
    readonly bindingKey: string = EmailPayloadCommand.SendRegistrationStatus;

    constructor(private emailService: EmailServiceInterface) {}

    handleMessage(message: Message<EmailPayload>): void {
        try {     
            const { payload: { sender, receipient, emailOptions} } = message;
            console.log({ sender, receipient })
            
            if (!sender.email || !receipient.email || !emailOptions.content) {
                throw new Error("Invalid Email Payload");
            }
    
            this.emailService.sendEmail(message.payload);
        } catch (error) {
            console.log({ error });
        }
    }
}