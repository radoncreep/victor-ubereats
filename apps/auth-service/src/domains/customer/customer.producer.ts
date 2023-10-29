import { BaseAMQProducer, NotificationPayload } from "mq-service-pkg";

type Event = {
    routingKey: string;
    payload: NotificationPayload<"email">
}

// export class CustomerProducer extends BaseAMQProducer<Event> {
    
// }