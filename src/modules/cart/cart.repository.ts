import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CartRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async create(userId: number) {
    return await this.prismaClient.cart.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getCart(userId: number) {
    return await this.prismaClient.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async removeProductFromCart(cartId: number, productId: number) {
    return await this.prismaClient.cartItem.delete({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });
  }
}
