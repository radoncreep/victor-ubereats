import amqplib, { Channel, Connection } from "amqplib";

interface ProducerEvent {
    routingKey: string;
    payload: any;
}

enum Subjects {
    SendOneTimePassword = "send:otp"
}

type ExchangeType = {
    name: string;
    type: "direct" | "fanout" | "topic"
}


export abstract class BaseAMQProducer<E extends ProducerEvent> {
    private readonly URI: string = process.env.RABBITMQ_URI as string;
    private channel: Channel;
    private readonly exchange: ExchangeType = {
        name: "",
        type: "fanout"
    }

    public async createChannel() {
        const connection = await amqplib.connect(this.URI);
        this.channel = await connection.createChannel();
        console.log("Channel Created.")
    }

    public async publishMessage(payload: E["payload"], routingKey: E["routingKey"]) {
        // if (!this.channel) await this.createChannel();

        // // create an exchange and define the rule of message delivery to queue
        // // by defining the exchange type
        // await this.channel.assertExchange(this.exchange.name, this, { 
        //     durable: false
        // });


        // // 
        // const message: Message = { routingKey, payload };

        // // publish message to auth exchange
        // this.channel.publish(this.exchangeName, routingKey, Buffer.from(
        //     JSON.stringify(message)
        // ));
    }
}