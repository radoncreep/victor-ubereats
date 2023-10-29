import { AMQPExchangeType } from "../constants";

export enum NotificationExchange {
    Name = "notification.event",
    Type = AMQPExchangeType.Topic,
}

export enum NotificationEvent {
    SendOtp = "otp.send",
    SendEmail = "email.send"
}

export type NotificationEmailType = {
    event: NotificationEvent;
    payload: {
        email: string;
        username?: string;
        userId?: string;
    }
}

export type NotificationSmsType = {
    event: NotificationEvent.SendOtp;
    payload: {
        phone: string;
    }
}

export enum NotificationQueues {
    EmailEventQueue = "notification.email",
    SmsEventQueue = "notification.sms"
}

export type EventType = "email" | "sms";

export type NotificationEmailPayload = {
    eventType: string,
    receipientEmail: string;
}

export type NotificationSmsPayload = {
    eventType: string,
    phoneNumber: string;
}

export type NotificationPayload<P> = P extends "email" ? 
    NotificationEmailPayload : NotificationSmsPayload;

interface D {
    str: string;
    str2: string;
}
