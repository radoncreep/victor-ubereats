
export type UserRole = "customer" | "vendor" | "rider";

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    password: string;
    role: UserRole;
}

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

