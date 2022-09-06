import { JwtAuthGuard } from '@app/auth';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  /**
   * @constructor OrdersController DI
   * @param ordersService
   */
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * @method fetchAllData
   * @param req
   * @returns
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async fetchAllOrders(@Req() req: any) {
    return this.ordersService.fetchAllOrders(req.cookies?.Authentication);
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
