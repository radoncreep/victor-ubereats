import { CreatePhonePayload, PhoneInterface } from "./phone.interface";


// validate phone, country code etc use some api service to validate further
export class PhoneService implements PhoneInterface {
    createValidPhone(payload: CreatePhonePayload): string {
        const {countryCode, localNumber: localNumberPayload} = payload;

        const noDigitsRegex = /\D/g;
        const localNumber: string = localNumberPayload.replace(noDigitsRegex, '');
        const numberWithCountryCode = countryCode.trim() + localNumber;

        return numberWithCountryCode;
    }
}