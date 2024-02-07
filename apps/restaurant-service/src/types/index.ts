import type { Response } from "express";

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

export type SuccessResponse<T> = {
    success: boolean;
    payload: T;
}

export type ControllerResponse<T> = Promise<Response<SuccessResponse<T>>>;

export interface DatabaseInterface <P, R> {
    create(payload: P): Promise<R>;
    getById(id: string): Promise<R | null>;
    getMany(limit: number, page: number): Promise<R[] | null>;
    delete(id: string): void;
    update(id: string, payload: P): Promise<R | null>;
    count(): Promise<number>;
}

export type MenuItem = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string;
    restaurantId: string;
}

export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type TimePeriod = "startTime" | "endTime";
export type TimeAvailability = {
    [key in DayOfWeek]?: Record<TimePeriod, string>;
};

declare global {
    namespace Express {
        interface Request {
            user: User,
        }
    }
}


