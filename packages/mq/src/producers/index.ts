import amqplib, { Channel, Connection } from "amqplib";


export type ExchangeType = "direct" | "fanout" | "topic";
export type ExchangeObject = {
    name: string;
    type: ExchangeType
}

export abstract class BaseAMQProducer {
    protected readonly URI: string;
    protected channel: Channel;
    protected readonly exchange: ExchangeObject;

    protected async createChannel(): Promise<void> {}

    // public async publishMessage<P>(message: Message<P>): Promise<void> {}
}