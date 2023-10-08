enum AMQPExchangeType {
    Direct = "direct",
    Topic = "topic",
    Fanout = "fanout",
    Headers = "headers"
}

enum NotificationConsumer {
    ExchangeName = "notification.event",
    ExchangeType = AMQPExchangeType.Topic,
}

