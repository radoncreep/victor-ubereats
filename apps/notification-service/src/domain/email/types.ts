export type ReceipentDetails = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
}

export type SenderDetails = {
    firstname: string;
    lastname?: string;
    email: string;
    phone?: string;
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