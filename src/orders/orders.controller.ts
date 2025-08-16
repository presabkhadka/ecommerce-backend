import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ZodValidationPipe } from 'src/common/pipes/zod.pipe';
import { addOrderSchema } from './dto/add-order.dto';
import type { addOrderDto } from './dto/add-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  async fetchOrders() {
    return this.ordersService.getOrder()
  }

  @Post()
  @UsePipes(new ZodValidationPipe(addOrderSchema))
  addOrder(
    @Body() dto: addOrderDto
  ) {
    return this.ordersService.addOrder(dto)
  }

  // for confirming the  order
  @Patch(':id')
  confirmOrder(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.confirmOrder(id)
  }

  // for cancelling the  order
  @Patch(':id')
  cancelOrder(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.cancelOrder(id)
  }

}
