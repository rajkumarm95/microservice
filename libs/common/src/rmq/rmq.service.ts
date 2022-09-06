import { Injectable } from '@nestjs/common';
import { Transport, RmqOptions, RmqContext } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class RmqService {
  /**
   * @constructor RmqService DI
   * @param configService
   */
  constructor(private configService: ConfigService) {}
  /**
   * @method getOptions
   * @desc defining microservice clients
   * @param queueName
   * @param noAck
   * @returns
   */
  getOptions(queueName: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: queueName,
        noAck,
        persistent: true,
      },
    };
  }

  /**
   * @method ack
   * @desc function for manual ack
   * @desc
   * @param context
   */
  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
