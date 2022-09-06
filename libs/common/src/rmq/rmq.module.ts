import { ConfigService } from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RmqService, ConfigService],
  exports: [RmqService],
})
export class RmqModule {
  /**
   * @method register
   * @desc used to register microservice
   * @param param0
   * @returns
   */
  static register({ name: queueName }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: queueName.toUpperCase(),
            useFactory: async (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: ['amqp://localhost:5672'],
                queue: queueName,
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
