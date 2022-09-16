import { RmqContext } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  async handleEvent(data: any, context: RmqContext) {
    console.log({ msg: 'generating bill', data, context });

    //business logic goes here
  }
}
