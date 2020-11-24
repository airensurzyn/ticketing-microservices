 import { Publisher, OrderCreatedEvent, Subjects } from '@airentickets/common';

 export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
 }