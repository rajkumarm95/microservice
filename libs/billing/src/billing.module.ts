import { AuthModule } from '@app/auth';
import { CommonModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
  imports: [AuthModule, CommonModule, RmqModule.register({ name: 'auth' })],
})
export class BillingModule {}
