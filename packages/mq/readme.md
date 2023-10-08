Notification Service

Typically, there could be multiple processes in a notification service. But in this application I created 2 for handling emails and short messages (sms);

Exchanges


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

By separating the queues for different message types, you can optimize the performance, scalability, and reliability of your notification service while maintaining a clear and modular design.