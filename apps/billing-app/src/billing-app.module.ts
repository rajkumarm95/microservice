import { BillingModule } from '@app/billing';
import { Module } from '@nestjs/common';

@Module({
  imports: [BillingModule],
})
export class BillingAppModule {}
