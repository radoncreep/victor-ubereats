export type QueueMessage<P> = {
    subject: string;
    timestamp: Date;
    messageType: "command" | "query" | "event";
    payload: P;
    producer: string;
    consumer: string;
}