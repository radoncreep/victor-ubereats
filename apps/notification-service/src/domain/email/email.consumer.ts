import { EmailQueueMessage, EmailQueueMessageSubject } from "ubereats-types";

import { QueueMessageHandlerInterface } from "../../services/events/consumer.interface";
import { STMPService } from "./services/smtp.service";
import { EmailBuilder } from "./types";


export class EmailQueueMessageHandler implements QueueMessageHandlerInterface {
    readonly bindingKey: string = EmailQueueMessageSubject.CreateAccount;
    private mailBuilders: Map<EmailQueueMessageSubject, EmailBuilder> = new Map();

    constructor(private smtpService: STMPService) {}

    handleMessage(queueMessage: EmailQueueMessage<any>): void {
        try {     
            const { subject, payload } = queueMessage;
            
            const mailBuilder = this.mailBuilders.get(subject);
            
            if (!mailBuilder) {
                throw new Error(`No Builder for Email Queue Messasge with Subject: ${subject}`);
            }

            const mail = mailBuilder.buildEmail(payload);

            this.smtpService.send(mail);
            
        } catch (error) {
            console.log({ error });
        }
    }

    set setMailbuilders(builder: EmailBuilder) {
        this.mailBuilders.set(builder._builderName, builder);
    }
}
// QueueMessage<BaseEmailPayload, EmailQueueMessageSubject>