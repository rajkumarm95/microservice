import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';

@Injectable()
export class OrdersRepository {
  /**
   * @constructor OrdersLibRepository DI
   * @param ordersRepository
   */
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) {}

  /**
   * @method CreateNewOrder
   * @returns
   */
  async CreateNewOrder(req: any) {
    return this.ordersRepository.save(
      this.ordersRepository.create({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
      }),
    );
  }
  /**
   * @method fetchOrderById
   * @param id
   * @returns
   */
  async fetchOrderById(id: number) {
    return this.ordersRepository.findOne({ where: { id } });
  }
}
