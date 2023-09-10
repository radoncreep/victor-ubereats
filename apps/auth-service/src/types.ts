export interface PasswordServiceInterface {
    encrypt(password: string): Promise<string>;
    verify(password: string, hashedPassword: string): Promise<boolean>;
}