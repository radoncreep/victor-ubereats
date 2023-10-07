import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
import logger from "morgan";

import { TwilioSmsServce } from "./domain/sms/sms.service";
import { AMQPConsumer } from "./services/events/consumer";
import { SmsQueueMessageHandler } from "./domain/sms/sms.consumer";
import { EmailQueueMessageHandler } from "./domain/email/email.consumer";
import { EmailService } from "./domain/email/email.service";


const app = express();
app
    .use(json({ type: "application/json" }))
    .use(logger("dev"))


const PORT = process.env.PORT || 1014;

app.listen(PORT, async () => { 

    const smsHandler = new SmsQueueMessageHandler(new TwilioSmsServce);
    const emailHandler = new EmailQueueMessageHandler(new EmailService);

    const queueMsgHandlerMap = new Map();
    queueMsgHandlerMap.set(smsHandler.bindingKey, smsHandler);
    queueMsgHandlerMap.set(emailHandler.bindingKey, emailHandler);

    const consumer = new AMQPConsumer(
        process.env.RABBITMQ_URI as string, 
        "notification", // this can be better
        queueMsgHandlerMap
    );
    await consumer.createChannel();
    await consumer.declareExchange();
    await consumer.bindQueues();
    await consumer.consumeMessage();

    // new SmsController(new TwilioSmsServce, new CacheService, new AMQPConsumer)
    console.log(`${process.env.SERVICE_NAME} Service is listening on port ${PORT}`);
});
