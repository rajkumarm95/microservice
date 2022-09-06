import { OrdersModule } from '@app/orders';
import { Module } from '@nestjs/common';

@Module({
  imports: [OrdersModule],
})
export class AppModule {}
