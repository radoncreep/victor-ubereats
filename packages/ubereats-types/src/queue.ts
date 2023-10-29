export type QueueMessage = {
    subject: string;
    timestamp: Date;
    messageType: "command" | "query" | "event";
    payload: unknown;
    producer: string;
    consumer: string;
}