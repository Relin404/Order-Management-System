import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CartItemsRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async findCartItemsByCartId(cartId: number) {
    return await this.prismaClient.cartItem.findMany({
      where: {
        cartId,
      },
      include: {
        product: true,
      },
    });
  }

  async findOne(cartId: number, productId: number) {
    return await this.prismaClient.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });
  }

  async createCartItem(cartId: number, productId: number, quantity: number) {
    return await this.prismaClient.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
  }

  async updateCartItemQuantity(cartItemId: number, quantity: number) {
    return await this.prismaClient.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });
  }

  async clearCartItems(cartId: number) {
    return await this.prismaClient.cartItem.deleteMany({
      where: {
        cartId,
      },
    });
  }
}
