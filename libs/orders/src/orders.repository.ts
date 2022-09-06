import { Orders } from './entities/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersLibRepository {
  /**
   * @constructor OrdersLibRepository DI
   * @param ordersLibRepository
   */
  constructor(
    @InjectRepository(Orders)
    private ordersLibRepository: Repository<Orders>,
  ) {}

  /**
   * @method fetchAllData
   * @returns
   */
  async fetchAllData() {
    return this.ordersLibRepository.find();
  }
  /**
   * @method fetchOrderById
   * @param id
   * @returns
   */
  async fetchOrderById(id: number) {
    return this.ordersLibRepository.findOne({ where: { id } });
  }
}
