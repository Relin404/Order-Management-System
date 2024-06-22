import { Injectable } from '@nestjs/common';
import { Status } from 'src/modules/orders/dtos/update-order-status.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async getOrders(userId: number) {
    return await this.prismaClient.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async getOrder(orderId: number) {
    return await this.prismaClient.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async createPendingOrder(userId: number, addressId: number) {
    return await this.prismaClient.order.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        address: {
          connect: {
            id: addressId,
          },
        },
        total: 0,
        status: Status.PENDING,
      },
    });
  }

  async updateOrderStatus(orderId: number, status: Status) {
    return await this.prismaClient.order.update({
      where: { id: orderId },
      data: {
        status,
      },
    });
  }

  async updateOrderTotal(orderId: number, total: number) {
    return await this.prismaClient.order.update({
      where: { id: orderId },
      data: {
        total,
      },
    });
  }

  async applyCoupon(orderId: number, discount: number) {
    const order = await this.prismaClient.order.findUnique({
      where: { id: orderId },
      select: { total: true },
    });

    return await this.prismaClient.order.update({
      where: { id: orderId },
      data: {
        discount,
        total: order.total - order.total * discount,
      },
    });
  }
}
