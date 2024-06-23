import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItemsModule } from 'src/modules/cart-items/cart-items.module';
import { ProductsModule } from 'src/modules/products/products.module';
import { CartRepository } from 'src/modules/cart/cart.repository';

@Module({
  imports: [CartItemsModule, ProductsModule],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService],
})
export class CartModule {}
