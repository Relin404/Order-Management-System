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
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartService } from 'src/modules/carts/cart.service';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBody({ type: 'number', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product added to cart' })
  @ApiNotFoundResponse({ status: 404, description: 'Product not found' })
  @Post('/add')
  async addProductToCart(@Body() addProductToCartDto: any) {
    const cart = await this.cartService.addProductToCart(
      addProductToCartDto.cartId,
      addProductToCartDto.productId,
      addProductToCartDto.quantity,
    );

    return cart;
  }

  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Cart found' })
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

  @ApiParam({ name: 'cartId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Product removed from cart' })
  @ApiNotFoundResponse({ status: 404, description: 'Product not found' })
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
