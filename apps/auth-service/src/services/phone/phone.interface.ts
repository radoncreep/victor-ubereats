export type CreatePhonePayload = {
    countryCode: string;
    localNumber: string;
}

export interface PhoneInterface {
    createValidPhone(payload: CreatePhonePayload): string;
}