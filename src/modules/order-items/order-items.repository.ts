import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class OrderItemsRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async createOrderItem(orderId: number, productId: number, quantity: number) {
    return await this.prismaClient.orderItem.create({
      data: {
        order: {
          connect: {
            id: orderId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
        quantity,
      },
    });
  }

  async findOrderItemsByOrderId(orderId: number) {
    return await this.prismaClient.orderItem.findMany({
      where: {
        orderId,
      },
      include: {
        product: true,
      },
    });
  }
}
