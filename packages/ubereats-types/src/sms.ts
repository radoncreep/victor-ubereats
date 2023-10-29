import { QueueMessage } from "./queue";

// SMS
export enum SmsPayloadCommand {
    SendOtp = "auth.notification.otp",
    SendDeliveryStatus = "SendDeliveryStatus"
}

export enum SmsQueueMessageSubjects {

}

export type SmsOtpPayload = {
    customerPhone: string;
    oneTimePassword: number;
}

export type SmsPayload = {
    command: SmsPayloadCommand;
} & SmsOtpPayload;

export interface IResponse {
    success: boolean;
}

export interface SmsQueueMessage<P> extends QueueMessage {
    subject: SmsPayloadCommand;
    payload: P;
}