export enum AMQPExchangeType {
    Direct = "direct",
    Topic = "topic",
    Fanout = "fanout",
    Headers = "headers"
}

export enum EmailPayloadCommand {
    SendRegistrationStatus = "SendRegistrationStatus",
    SendPromotionalMail = "SendPromotionalMail",
    SendOrderStatus = "SendOrderStatus"
}

export enum SmsPayloadCommand {
    SendOtp = "auth.notification.otp",
    SendDeliveryStatus = "SendDeliveryStatus"
}

export enum Exchanges {
    AuthNofitication = "auth.notification"
}