export interface QueueMessageHandlerInterface {
    bindingKey: string;
    handleMessage(message: any): void
}