export type ReceipentDetails = {
    phone: string;
    country?: string;
    countryCode?: string;
}

type SmsContent = string;
type SmsSubject = string;

export type SmsOptions = {
    content: SmsContent;
    subject?: SmsSubject;
}

export type SmsPayload = {
    phoneNumber: string;
    body: string;
}

export interface SmsServiceInterface {
    sendMessage(payload: SmsPayload): Promise<{success: boolean}>;
}