import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addOrderDto } from './dto/add-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaSerivce: PrismaService
  ) { }

  // for creating a order
  async addOrder(dto: addOrderDto) {
    const productExists = await this.prismaSerivce.products.findFirst({
      where: {
        id: dto.productId
      }
    })

    if (!productExists) {
      throw new NotFoundException('No such product found')
    }

    if (productExists.stock < dto.quantity) {
      throw new BadRequestException('Cannot place order with quantity more than product stock')
    }

    await this.prismaSerivce.products.update({
      where: {
        id: dto.productId
      },
      data: {
        stock: {
          decrement: dto.quantity
        }
      }
    })

    const createOrder = await this.prismaSerivce.orders.create({
      data: dto
    })

    return {
      message: "Order added successfully",
      data: createOrder
    }
  }

  // for confirming order
  async confirmOrder(id: number) {
    const orderExists = await this.prismaSerivce.orders.findFirst({
      where: {
        id: id
      }
    })

    if (!orderExists) {
      throw new NotFoundException('No such order found')
    }

    const orderConfirmed = await this.prismaSerivce.orders.update({
      where: {
        id: id
      },
      data: {
        order_status: 'ON_THE_WAY'
      }

    })

    return {
      message: 'Order has been confirmed successfully',
      data: orderConfirmed
    }
  }

  // for cancelling the order
  async cancelOrder(id: number) {

    const orderExists = await this.prismaSerivce.orders.findFirst({
      where: {
        id: id
      }
    })

    if (!orderExists) {
      throw new NotFoundException('No such order found')
    }

    const cancelOrder = await this.prismaSerivce.orders.update({
      where: {
        id: id
      },
      data: {
        order_status: 'CANCELED'
      }
    })

    return {
      message: "Order has been cancelled successfully",
      data: cancelOrder
    }
  }

  // for getting details about the order
  async getOrder() {
    const orders = await this.prismaSerivce.orders.findMany()

    return {
      message: 'Orders fetched successfully',
      data: orders
    }
  }
}
