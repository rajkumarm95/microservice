import { RmqModule } from './../../common/src/rmq/rmq.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Orders } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';
import { AuthModule } from '@app/auth';
import { CommonModule } from '@app/common';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
  imports: [
    forwardRef(() => CommonModule),
    TypeOrmModule.forFeature([Orders]),
    RmqModule.register({ name: 'billing' }), // defining microsoft client
    RmqModule.register({ name: 'auth' }),
    AuthModule,
  ],
})
export class OrdersModule {}
