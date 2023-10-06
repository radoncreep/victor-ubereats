import amqplib, { Channel, Connection } from "amqplib";

type ExchangeType = "direct" | "fanout" | "topic" | "headers";

interface Message {
    routingKey: string;
    payload: any;
}

enum Subjects {
    SendOneTimePassword = "send:otp"
}

export class AMQProducer {
    private readonly URI: string = process.env.RABBITMQ_URI as string;
    private client: Connection;
    private channel: Channel;
    private exchangeName = "notification";

    public async createChannel() {
        const connection = await amqplib.connect(this.URI);
        this.channel = await connection.createChannel();
        console.log("Channel Created.")
    }

    public async publishMessage(payload: any, routingKey: string) {
        if (!this.channel) await this.createChannel();

        // create an exchange and define the rule of message delivery to queue
        // by defining the exchange type
        const exchangeType: ExchangeType = "direct";
        await this.channel.assertExchange(this.exchangeName, exchangeType, { 
            durable: false
        });

        const message: Message = { routingKey, payload };

        // publish message to auth exchange
        this.channel.publish(this.exchangeName, routingKey, Buffer.from(
            JSON.stringify(message)
        ));
    }
}