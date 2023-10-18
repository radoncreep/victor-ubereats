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

export type EmailPayload = {
    receipient: ReceipentDetails;
    sender: SenderDetails;
    emailOptions: EmailOptions;
}

export interface EmailServiceInterface {
    sendEmail(payload: EmailPayload): void;
}