import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
import logger from "morgan";

import { TwilioSmsServce } from "./domain/sms/sms.service";
import { AMQPConsumer } from "./services/events/consumer";
import { SmsQueueMessageHandler } from "./domain/sms/sms.consumer";
import { EmailQueueMessageHandler } from "./domain/email/email.consumer";
import { MailjetSMTPService } from "./domain/email/services/smtp.service";
import { CreateAccountEmailBuilder } from "./domain/email/services/create-account-email-handler";


const app = express();
app
    .use(json({ type: "application/json" }))
    .use(logger("dev"))


const PORT = process.env.PORT || 1014;

app.listen(PORT, async () => { 

    const smsHandler = new SmsQueueMessageHandler(new TwilioSmsServce);
    const emailHandler = new EmailQueueMessageHandler(new MailjetSMTPService);
    emailHandler.setMailbuilders = new CreateAccountEmailBuilder;
    console.log("uri" ,process.env.RABBITMQ_URI)

    const consumer = await new AMQPConsumer({
        uri: process.env.RABBITMQ_URI as string,
        exchange: { 
            name: "auth.notification", 
            type: "topic" 
        },
        messageHandlers: [
            emailHandler, 
            smsHandler
        ]
    })
    consumer.listen();

    console.log(`${process.env.SERVICE_NAME} Service is listening on port ${PORT}`);
});
