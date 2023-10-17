import { EmailPayloadCommand, SmsPayloadCommand } from "./constants";

export type Message<P> = {
    messageSubject: string;
    timestamp: Date;
    messageType: "command" | "query" | "event";
    payload: P;
    producer: string;
    consumer: string;
}

// EMAIL
export type EmailPayload = {
    command: EmailPayloadCommand;
    payload: { customerEmail: string }
}


// SMS
export type SmsOtpPayload = {
    customerPhone: string;
    oneTimePassword: number;
}

export type SmsPayload = {
    command: SmsPayloadCommand;
} & SmsOtpPayload;

