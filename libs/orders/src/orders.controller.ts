import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '@app/auth';

@Controller('orders')
export class OrdersController {
  /**
   * @constructor OrdersController DI
   * @param ordersService
   */
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * @method CreateNewOrder
   * @param req
   * @returns
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async CreateNewOrder(@Req() req: any) {
    return this.ordersService.CreateNewOrder(req);
  }

  /**
   * @method fetchOneOrder
   * @param id
   * @param req
   * @returns
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async fetchOneOrder(@Param('id') id: number, @Req() req: any) {
    return this.ordersService.fetchOrderById(id);
  }
}
