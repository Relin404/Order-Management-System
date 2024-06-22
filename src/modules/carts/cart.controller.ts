import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from 'src/modules/carts/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  async addProductToCart(@Body() addProductToCartDto: any) {
    const cart = await this.cartService.addProductToCart(
      addProductToCartDto.cartId,
      addProductToCartDto.productId,
      addProductToCartDto.quantity,
    );

    return cart;
  }

  @Get('/:userId')
  async getCart(@Param('userId', ParseIntPipe) userId: number) {
    const cart = await this.cartService.getCart(userId);

    return cart;
  }

  @Patch('/update')
  async updateCartItemQuantity(@Body() updateCartItemQuantityDto: any) {
    const cartItem = await this.cartService.updateCartItemQuantity(
      updateCartItemQuantityDto.cartItemId,
      updateCartItemQuantityDto.quantity,
    );

    return cartItem;
  }

  @Delete('/:cartId')
  async removeProductFromCart(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Body() productId: number,
  ) {
    const cartItem = await this.cartService.removeProductFromCart(
      cartId,
      productId,
    );

    return cartItem;
  }
}
