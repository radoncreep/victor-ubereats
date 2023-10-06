export interface QueueMessageHandlerInterface {
    messageType: string;
    handleMessage(message: any): void
}