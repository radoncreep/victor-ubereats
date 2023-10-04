export type OtpConfig = {
    length: number;
    pattern: "alphanumeric" | "numeric" | "alphabets" | "allCharacters" | "specialCharacters";
}

export interface OneTimePasswordInterface {
    generate(config?: OtpConfig): number | string;
}