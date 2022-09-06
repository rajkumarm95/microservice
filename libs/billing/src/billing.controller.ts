import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { BillingService } from './billing.service';
import { RmqService } from '@app/common';
import { JwtAuthGuard } from '@app/auth';

@Controller('billing')
export class BillingController {
  /**
   * @constructor BillingController DI
   * @param billingService
   * @param rmqService
   */
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  /**
   * @method handleEvent
   * @param data
   * @param context
   */
  @EventPattern('order_created')
  @UseGuards(JwtAuthGuard)
  async handleEvent(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.billingService.handleEvent(data, context);
    this.rmqService.ack(context); // manual ack
  }
}
