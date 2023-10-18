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
export type ReceipentDetails = {
    email: string;
}

export type SenderDetails = {
    email: string;
}

type IsBulkMail = boolean;
type EmailContent = string;
type EmailSubject = string;

export type EmailOptions = {
    bulk: IsBulkMail;
    content: EmailContent;
    subject: EmailSubject;
}

export type EmailRegistrationPayload = { 
    receipient: ReceipentDetails;
    sender: SenderDetails;
    emailOptions: EmailOptions;
}

export type EmailPayload = {
    command: EmailPayloadCommand;
} & EmailRegistrationPayload;


// SMS
export type SmsOtpPayload = {
    customerPhone: string;
    oneTimePassword: number;
}

export type SmsPayload = {
    command: SmsPayloadCommand;
} & SmsOtpPayload;

