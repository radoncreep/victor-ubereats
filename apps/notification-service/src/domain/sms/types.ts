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
    receipient: ReceipentDetails;
    emailOptions: SmsOptions;
}

export interface SmsServiceInterface {
    verifyPhone(phone: string): Promise<string>;
    sendMessage(payload: SmsPayload): Promise<{success: boolean}>;
}