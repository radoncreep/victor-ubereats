Notification Service

Typically, there could be multiple processes in a notification service. But in this application I created 2 for handling emails and short messages (sms);

Exchange
Naming Convention: Each exhg aligns with the names of the service that utilizes them. The name of each exchange indicates the relationship between two or mulitple services, which is useful to identify the association of each service as producer and consumer(s) interacting with an exchange. This way it is decriptive and easy to identify for maintaince (to track issues or just understand the system). For example 
Type: The type of each exchange depends on the communcation between systems which could also determine how routing key(s) are defined. For example, if the auth micro-service sends several messages to the notification micro-service to perform sms and email delivery actions, then a topic exchange will be most suitable. This is because of the following 
- it allows for mulitple message routing; i.e it allows to route messages to queues based on different criteria.
- different routing keys can be set up for different notification actions
Auth -> Notification Scenario;
- When the authentication service wants to trigger the notification service to send an OTP via SMS, it can publish a message with a routing key like "notification.sms."\

- When it wants to trigger the notification service to send an email, it can use a different routing key like "notification.email."

- The notification service has queues bound to the Topic Exchange with bindings that match these routing keys.
    
- The notification service can process messages based on the routing keys, distinguishing between SMS and email notifications.

Queues
Used two different queues to handle the messages from the exchange, namely;
- notification.sms.events
- notification.email.events

Reasons for using different queues
SRP: Separating messages into distinct queues aligns with the Single Responsibility Principle (SRP) and helps maintain a clear separation of responsibilities within the notification service. Each process can focus on its specific task without being concerned about the other type of message.
Scalability: For large projects, scalability is concern. But this is just a personal project. For example, you might want to allocate more resources to a specific process (e.g email processing), having a queue which independently handles is good practice.
Prioritization: Just as how you have it in your usual queues to prioritize an element based on some condition, you can also have that in your task or worker queues in your AMQP service.
Error Handling: When errors occur during processing, segregating messages into separate queues allows for more granular error handling and retries. If one type of message encounters issues, it doesn't affect the processing of the other type.
So for instance, we are using a single queue to handle both processes and an error occurs while the application is trying to process an email message and I happen to not handle this error which causes the queue to have pending messages. A message could be of type sms, which contains an otp to send to a user's phone. This will disrupt a user who is trying to authenticate against email which is just trying to send a promo message that some chicken shop now sells jollof rice at a discounted price.

By separating the queues for different message types, you can optimize the performance, scalability, and reliability of your notification service while maintaining a clear and modular design. Keep in mind that using a single queue with multiple bindings means that all messages end up in the same queue, and you may need to include logic in your consumer to distinguish between different message types based on the routing key or other message attributes.