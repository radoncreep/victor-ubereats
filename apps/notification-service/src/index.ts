import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
import logger from "morgan";
import cors from "cors";

import { TwilioSmsServce } from "./domain/sms/sms.service";
import { AMQPConsumer } from "./services/events/consumer";
import { SmsQueueMessageHandler } from "./domain/sms/sms.consumer";


const app = express();
app
    .use(json({ type: "application/json" }))
    .use(logger("dev"))


const PORT = process.env.PORT || 1014;

app.listen(PORT, async () => { 

    const smsHandler = new SmsQueueMessageHandler(new TwilioSmsServce);
    const queueMsgHandlerMap = new Map();
    queueMsgHandlerMap.set("sms", smsHandler);

    const consumer = new AMQPConsumer(queueMsgHandlerMap);
    await consumer.createChannel();
    await consumer.consumeMessage();

    // new SmsController(new TwilioSmsServce, new CacheService, new AMQPConsumer)
    console.log(`${process.env.SERVICE_NAME} Service is listening on port ${PORT}`);
});
