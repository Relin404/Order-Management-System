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
import { CartService } from 'src/modules/cart/cart.service';
import { AddProductToCartDto } from 'src/modules/cart/dtos/add-product.dto';
import { RemoveProductFromCartDto } from 'src/modules/cart/dtos/remove-product.dto';
import { UpdateCartItemQuantityDto } from 'src/modules/cart/dtos/update-cart-item-quantity.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({
    summary: 'Add product to cart',
    operationId: 'addProductToCart',
  })
  @ApiBody({ type: 'number', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product added to cart' })
  @ApiNotFoundResponse({ status: 404, description: 'Product not found' })
  @Post('/add')
  async addProductToCart(@Body() addProductToCartDto: AddProductToCartDto) {
    const cart = await this.cartService.addProductToCart(
      addProductToCartDto.cartId,
      addProductToCartDto.productId,
      addProductToCartDto.quantity,
    );

    return cart;
  }

  @ApiOperation({ summary: 'Get cart', operationId: 'getCart' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Cart found' })
  @Get('/:userId')
  async getCart(@Param('userId', ParseIntPipe) userId: number) {
    const cart = await this.cartService.getCart(userId);

    return cart;
  }

  @ApiOperation({
    summary: 'Update cart item quantity',
    operationId: 'updateCartItemQuantity',
  })
  @ApiBody({ type: UpdateCartItemQuantityDto, description: 'Cart item data' })
  @ApiResponse({ status: 200, description: 'Cart item updated' })
  @ApiNotFoundResponse({ status: 404, description: 'Cart item not found' })
  @Patch('/update')
  async updateCartItemQuantity(
    @Body() updateCartItemQuantityDto: UpdateCartItemQuantityDto,
  ) {
    const cartItem = await this.cartService.updateCartItemQuantity(
      updateCartItemQuantityDto.cartItemId,
      updateCartItemQuantityDto.quantity,
    );

    return cartItem;
  }

  @ApiOperation({
    summary: 'Remove product from cart',
    operationId: 'removeProductFromCart',
  })
  @ApiParam({ name: 'cartId', type: 'number' })
  @ApiBody({ type: RemoveProductFromCartDto, description: 'Product data' })
  @ApiResponse({ status: 200, description: 'Product removed from cart' })
  @ApiNotFoundResponse({ status: 404, description: 'Product not found' })
  @Delete('/:cartId')
  async removeProductFromCart(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Body() removeProductFromCartDto: RemoveProductFromCartDto,
  ) {
    const cartItem = await this.cartService.removeProductFromCart(
      cartId,
      removeProductFromCartDto.productId,
    );

    return cartItem;
  }
}
