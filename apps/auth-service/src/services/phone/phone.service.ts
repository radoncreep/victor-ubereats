import { CreatePhonePayload, PhoneInterface } from "./phone.interface";


export class PhoneService implements PhoneInterface {
    createValidPhone(payload: CreatePhonePayload): string {
        const {countryCode, localNumber: localNumberPayload} = payload;

        const noDigitsRegex = /\D/g;
        const localNumber: string = localNumberPayload.replace(noDigitsRegex, '');
        const numberWithCountryCode = countryCode.trim() + localNumber;

        return numberWithCountryCode;
    }
}