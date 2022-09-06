import { RmqModule } from './../../common/src/rmq/rmq.module';
import { CommonModule } from './../../common/src/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Orders } from './entities/order.entity';
import { OrdersLibRepository } from './orders.repository';
import { AuthModule } from '@app/auth';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersLibRepository],
  exports: [OrdersService],
  imports: [
    RmqModule.register({ name: 'billing' }), // defining microsoft client
    RmqModule.register({ name: 'auth' }),
    TypeOrmModule.forFeature([Orders]),
    forwardRef(() => CommonModule),
    AuthModule,
  ],
})
export class OrdersModule {}
