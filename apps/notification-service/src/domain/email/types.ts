export enum EmailQueueMessageSubject {
    CreateAccount = "CreateAccount",
    ResetPassword = "ResetPassword",
    DeliveryStatus = "DeliveryStatus",
    OrderStatus = "OrderStatus" 
}

export type DeliveryStatus = "delivered" | "failed";
export type OrderStatus = "processed" | "cancelled";

export interface BaseEmailPayload {
    receipient: string;
    sender?: string;
    subject?: string;
    body?: string;
}

export interface BuiltEmailPayload {
    subject: string;
    receipient: string;
    sender: string;
    body: string;
}

export interface CreateAccountEmailPayload extends BaseEmailPayload {
    verificationToken: string;
}

export interface ResetPasswordEmailPayload extends BaseEmailPayload {
    resetPasswordToken: string;
}

export interface DeliveryStatusEmailPayload extends BaseEmailPayload {
    status: DeliveryStatus;
    feedback?: string;
}

export interface OrderStatusEmailPayload extends BaseEmailPayload {
    status: OrderStatus;
    feedback?: string
}

export interface EmailQueueMessage extends QueueMessage {
    subject: EmailQueueMessageSubject;
}

export type QueueMessage = {
    subject: string;
    timestamp: Date;
    messageType: "command" | "query" | "event";
    payload: unknown;
    producer: string;
    consumer: string;
}

// type PayloadOf<T extends {payload: unknown}> = T["payload"];

// type EmailPayloadM = PayloadOf<EmailQueueMessage>;

export interface IResponse {
    success: boolean;
}

export interface EmailBuilder {
    readonly _builderName: EmailQueueMessageSubject;
    buildEmail(mailObject: BaseEmailPayload): BuiltEmailPayload;
}