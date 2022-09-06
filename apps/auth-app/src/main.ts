import { RmqOptions } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AuthAppModule } from './auth-app.module';

/**
 * this is a hybrid application it can act as a microservice as well as a stand alone app in a http port
 */

async function bootstrap() {
  const app = await NestFactory.create(AuthAppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('auth', true));
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
