import { BaseAMQProducer, ExchangeObject } from "mq-service-pkg/src/producers";
import amqplib from "amqplib";
import { EmailPayload, Message, SmsPayload } from "mq-service-pkg";


type ExchangeType = "direct" | "fanout" | "topic" | "headers";

type RoutingKey = "sms" | "email";

export type AuthNotificationEvent<P extends RoutingKey> = {
    routingKey: string,
    payload: P extends "sms" ? SmsPayload : EmailPayload;
}

export class AMQProducer extends BaseAMQProducer  {
    protected readonly URI = "amqp://localhost";
    protected readonly exchange: ExchangeObject = {
        name: "auth.notification",
        type: "topic"
    }

    public async createChannel() {
        const connection = await amqplib.connect(this.URI);
        this.channel = await connection.createChannel();
        console.log(`Channel for Auth:Notification Created.`)
    }

    public async publishMessage<P>(msg: Message<P>) {
        if (!this.channel) await this.createChannel();

        // create an exchange and define the rule of message delivery to queue
        // by defining the exchange type
        await this.channel.assertExchange(this.exchange.name, this.exchange.type, { 
            durable: false
        });

        const message = Buffer.from(JSON.stringify(msg));
        const routingKey = msg.messageSubject;

        console.log("published")
        // publish message to auth exchange
        this.channel.publish(this.exchange.name, routingKey, message);
    }
}