import amqplib, { Channel, Connection, ConsumeMessage, Replies } from "amqplib";
import { QueueMessageHandlerInterface } from "./consumer.interface";


type ExchangeType = "direct" | "fanout" | "topic" | "headers";

export class AMQPConsumer {
    private readonly URI: string = process.env.RABBITMQ_URI as string;
    private channel: Channel | undefined;
    private exchangeName = "notification";
    private readonly defaultBindingKey = ".*."; // using a wildcard to accept all messages from the exhg - topic exhg
    private queue: Replies.AssertQueue | undefined;

    constructor(private readonly consumerSet: Map<string, QueueMessageHandlerInterface>) {}   

    public async createChannel() {
        const connection = await amqplib.connect(this.URI);
        this.channel = await connection.createChannel();
    }

    public async declareExchange() {

        // the exhg is also declared in the consumer;
        // because it just as it is forbidden to publish to a non-existing exhg
        // so is it for a queue to bind to a non-existing exhg 
        const exchangeType: ExchangeType = "direct";
        await this.channel!.assertExchange(this.exchangeName, exchangeType, {
            durable: false
        });
    }

    // if we don't create a queue that binds to an exhg with a binding key that message will be discarded
    public async bindQueues() {
        // declare queue to bind to exhg
        // empty queue name so rabbitmq or (any other amqp service) generates one for us
        this.queue = await this.channel!.assertQueue("", { exclusive: true });
        const queueName = this.queue?.queue;

        const bindingKeys = this.consumerSet.keys();
        for (let bindingKey of bindingKeys) {
            // bind queue to exhange
            const rep = await this.channel!.bindQueue(queueName, this.exchangeName, bindingKey);
            console.log({ rep })
            console.log("created queue with binding key: ", bindingKey);
        }
    }

    public async consumeMessage() {
        if (!this.channel) await this.createChannel();
        let consumedMessage;

        await this.channel!.consume(this.queue!.queue, (message) => {
            if (!message) {
                throw new Error("couldn't consume message.")
            }

            const { fields: { routingKey }, content } = message;
    
            const consumer = this.consumerSet.get(routingKey);
    
            if (!consumer) throw new Error(`No Consumer for ${routingKey} key`);
    
            const payload = JSON.parse(content.toString());
            consumer.handleMessage(payload);

        }, { noAck: true });

        return consumedMessage;
    }
}