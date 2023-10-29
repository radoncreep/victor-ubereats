import { BaseAMQProducer, ExchangeObject } from "mq-service-pkg/src/producers";
import amqplib from "amqplib";
import { QueueMessage } from "ubereats-types";


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

    // TODO: SET TYPE
    public async publishMessage<P extends QueueMessage>(message: P) {
        if (!this.channel) await this.createChannel();

        // create an exchange and define the rule of message delivery to queue
        // by defining the exchange type
        await this.channel.assertExchange(this.exchange.name, this.exchange.type, { 
            durable: false
        });

        const bufferedMessage = Buffer.from(JSON.stringify(message));
        const routingKey = message.subject;

        // publish message to auth exchange
        this.channel.publish(this.exchange.name, routingKey, bufferedMessage);
        console.log(`published ${message.subject} messsage`)
    }
}