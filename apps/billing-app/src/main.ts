import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { BillingAppModule } from './billing-app.module';

/**
 * this is an microservice application
 */

async function bootstrap() {
  const app = await NestFactory.create(BillingAppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('billing'));
  await app.startAllMicroservices();
}
bootstrap();

/**
 * create microservice - can create a single microservice connection
 * connect microservice - can create multiple connection with different transport layers also can have a hybrid application
 */
