import { Injectable } from '@nestjs/common';
import { CartItemsRepository } from 'src/modules/cart-items/cart-items.repository';
import { CartRepository } from 'src/modules/cart/cart.repository';
import { ProductsRepository } from 'src/modules/products/products.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductsRepository,
    private readonly cartItemsRepository: CartItemsRepository,
  ) {}

  async createCart(userId: number) {
    const cart = await this.cartRepository.create(userId);

    return cart;
  }

  async addProductToCart(cartId: number, productId: number, quantity: number) {
    const product = await this.productRepository.findOne(productId);
    if (!product) throw new Error('Product not found');

    let cartItem = await this.cartItemsRepository.findOne(cartId, productId);
    if (cartItem) {
      cartItem = await this.cartItemsRepository.updateCartItemQuantity(
        cartItem.id,
        cartItem.quantity + quantity,
      );

      return await this.getCart(cartId);
    }

    cartItem = await this.cartItemsRepository.createCartItem(
      cartId,
      productId,
      quantity,
    );

    return await this.getCart(cartId);
  }

  async getCart(userId: number) {
    const cart = await this.cartRepository.getCart(userId);

    return cart;
  }

  async updateCartItemQuantity(cartItemId: number, quantity: number) {
    const cartItem = await this.cartItemsRepository.updateCartItemQuantity(
      cartItemId,
      quantity,
    );

    return await this.getCart(cartItem.cartId);
  }

  async removeProductFromCart(cartId: number, productId: number) {
    const cartItem = await this.cartRepository.removeProductFromCart(
      cartId,
      productId,
    );

    return await this.getCart(cartId);
  }

  async clearCart(cartId: number) {
    await this.cartItemsRepository.clearCartItems(cartId);

    return await this.getCart(cartId);
  }
}
