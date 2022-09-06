import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersLibRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  /**
   * @constructor OrdersService DI
   * @param ordersRepository
   * @param billingClient
   */
  constructor(
    private ordersRepository: OrdersLibRepository,
    @Inject('BILLING') private billingClient: ClientProxy,
  ) {}

  /**
   * @method fetchAllData
   * @returns
   */
  async fetchAllOrders(authentication: string) {
    this.billingClient.emit(
      'order_created', // event pattern
      { mes: 'emitted from order service', Authentication: authentication }, //payload (data)
    );
    console.log('event emitted');

    return this.ordersRepository.fetchAllData();
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
