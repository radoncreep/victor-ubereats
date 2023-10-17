import amqplib, { Channel, Replies } from "amqplib";
import { QueueMessageHandlerInterface } from "./consumer.interface";


type ExchangeType = "direct" | "fanout" | "topic" | "headers";

type AMQPConsumerConfig = {
    readonly uri: string;
    readonly exchange: {
        name: string;
        type: ExchangeType;
    };
    messageHandlers: QueueMessageHandlerInterface[]
}

export class AMQPConsumer {
    private channel: Channel | undefined;
    // private exchangeName = "notification";
    private readonly defaultBindingKey = "#"; // default accept all messages from the exhg - topic exhg
    private declaredQueues: Replies.AssertQueue[] = [];
    private readonly messageHandlers: Map<string, QueueMessageHandlerInterface> = new Map();

    // constructor(
    //     private readonly URI: string,
    //     private readonly exchangeName: string,
    //     private readonly consumerSet: Map<string, QueueMessageHandlerInterface>
    // ) {}   

    constructor(private config: AMQPConsumerConfig) {}

    public async listen() {
        const { messageHandlers } = this.config;

        messageHandlers.forEach((handler) => {
            this.messageHandlers.set(handler.bindingKey, handler);
        });

        try {
            await this.createChannel();
            await this.declareExchange();
            await this.bindQueues();
            await this.consumeMessage();
        } catch (error) {
            console.log("Queue Setup Error: ")
            console.log(error);
        }
    }

    private async createChannel() {
        const connection = await amqplib.connect(this.config.uri);
        this.channel = await connection.createChannel();
    }

    private async declareExchange() {

        // the exhg is also declared in the consumer;
        // because it just as it is forbidden to publish to a non-existing exhg
        // so is it for a queue to bind to a non-existing exhg 
        const exhg = this.config.exchange;
        await this.channel!.assertExchange(exhg.name, exhg.type, {
            durable: false
        });
    }

    // if we don't create a queue that binds to an exhg with a binding key that message will be discarded
    private async bindQueues() {
        const bindingKeys = this.messageHandlers.keys();
        const exhg = this.config.exchange;

        for (let bindingKey of bindingKeys) {
            try {
                // declare queue to bind to exhg
                // empty queue name so rabbitmq or (any other amqp service) generates one for us
                const queue = await this.channel!.assertQueue("", { exclusive: true });
                const queueName = queue?.queue;
    
                // bind queue to exhange
                await this.channel!.bindQueue(queueName, exhg.name, bindingKey);
                this.declaredQueues.push(queue);
    
                console.log(`created queue ${queueName} with binding key: bindingKey: ${bindingKey}`);
            } catch (error) {
                console.log("q error ", error)
            }
        }
    }

    public async consumeMessage() {
        if (!this.channel) await this.createChannel();

        this.declaredQueues.forEach(async (queue) => {
            await this.channel!.consume(queue!.queue, (message) => {
                console.log("consuming")
                if (!message)
                    throw new Error("couldn't consume message.");
    
                const { fields: { routingKey }, content } = message;
        
                const consumer = this.messageHandlers.get(routingKey);
        
                if (!consumer) throw new Error(`No Consumer for ${routingKey} key`);
        
                const payload = JSON.parse(content.toString());
                consumer.handleMessage(payload);

                 // logger    
            }, { noAck: true });
        });

       
    }
}