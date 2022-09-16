import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  /**
   * @constructor OrdersService DI
   * @param ordersRepository
   * @param billingClient
   */
  constructor(
    private ordersRepository: OrdersRepository,
    @Inject('BILLING') private billingClient: ClientProxy,
  ) {}

  /**
   * @method fetchAllData
   * @returns
   */
  async CreateNewOrder(req: any) {
    this.billingClient.emit(
      'order_created', // event pattern
      {
        mes: 'emitted from order service',
        Authentication: req.cookies?.Authentication,
      }, //payload (data)
    );
    console.log('event emitted');

    return this.ordersRepository.CreateNewOrder(req);
  }

  /**
   * @method fetchOrderById
   * @param id
   * @returns
   */
  async fetchOrderById(id: number) {
    return this.ordersRepository.fetchOrderById(id);
  }
}
