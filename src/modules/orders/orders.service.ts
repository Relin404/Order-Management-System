import { Injectable } from '@nestjs/common';
import { CartService } from 'src/modules/carts/cart.service';
import { OrderItemsRepository } from 'src/modules/order-items/order-items.repository';
import { ApplyCouponDto } from 'src/modules/orders/dtos/apply-coupon.dto';
import { UpdateOrderStatusDto } from 'src/modules/orders/dtos/update-order-status.dto';
import { OrdersRepository } from 'src/modules/orders/orders.repository';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaClient: PrismaService,
    private readonly ordersRepository: OrdersRepository,
    private readonly orderItemsRepository: OrderItemsRepository,
    private readonly cartService: CartService,
  ) {}

  async createOrder(userId: number, addressId: number) {
    return await this.prismaClient.$transaction(async () => {
      const cart = await this.cartService.getCart(userId);

      if (!cart.cartItems.length) throw new Error('Cart is empty');
      const order = await this.ordersRepository.createPendingOrder(
        userId,
        addressId,
      );

      let total = 0;

      for (const cartItem of cart.cartItems) {
        await this.orderItemsRepository.createOrderItem(
          order.id,
          cartItem.productId,
          cartItem.quantity,
        );

        total += cartItem.product.price * cartItem.quantity;
      }

      await this.ordersRepository.updateOrderTotal(order.id, total);

      await this.cartService.clearCart(cart.id);

      return order;
    });
  }

  async getOrders(userId: number) {
    return await this.ordersRepository.getOrders(userId);
  }

  async getOrder(orderId: number) {
    return await this.ordersRepository.getOrder(orderId);
  }

  async updateOrderStatus(
    orderId: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const { status } = updateOrderStatusDto;

    return await this.ordersRepository.updateOrderStatus(orderId, status);
  }

  async applyCoupon(applyCouponDto: ApplyCouponDto) {
    return await this.ordersRepository.applyCoupon(
      applyCouponDto.orderId,
      applyCouponDto.discount,
    );
  }
}
