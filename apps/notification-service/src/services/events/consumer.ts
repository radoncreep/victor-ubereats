import amqplib, { Channel, Connection, ConsumeMessage } from "amqplib";
import { QueueMessageHandlerInterface } from "./consumer.interface";


type ExchangeType = "direct" | "fanout" | "topic" | "headers";

export class AMQPConsumer {
    private readonly URI: string = process.env.RABBITMQ_URI as string;
    private channel: Channel | undefined;
    private exchangeName = "notification";

    constructor(private readonly consumerSet: Map<string, QueueMessageHandlerInterface>) {}   

    public async createChannel() {
        const connection = await amqplib.connect(this.URI);
        this.channel = await connection.createChannel();
    }

    public async consumeMessage() {
        if (!this.channel) await this.createChannel();
        let consumedMessage;

        // the exhg is also declared in the consumer;
        // because it just as it is forbidden to publish to a non-existing exhg
        // so is it for a queue to bind to a non-existing exhg 
        const exchangeType: ExchangeType = "direct";
        await this.channel!.assertExchange(this.exchangeName, exchangeType, {
            durable: false
        });

        // declare queue to bind to exhg
        // empty queue name so rabbitmq or (any other amqp service) generates one for us
        const queue = await this.channel!.assertQueue("", { exclusive: true });
        const queueName = queue.queue;

        // bind queue to exhange
        await this.channel!.bindQueue(queueName, this.exchangeName, "sms");

        await this.channel!.consume(queueName, (message) => {
            if (!message) {
                throw new Error("couldn't consume message.")
            }

            this.useMessageHandler(message);

        }, { noAck: true });

        return consumedMessage;
    }

    public useMessageHandler(message: ConsumeMessage) {
        console.log({ message: message.content.toString() });

        const {
            fields: { routingKey },
            content
        } = message;

        const consumer = this.consumerSet.get(routingKey);

        if (!consumer) throw new Error(`No Consumer for ${routingKey} key`);

        const payload = JSON.parse(content.toString());
        consumer.handleMessage(payload);
    }
}