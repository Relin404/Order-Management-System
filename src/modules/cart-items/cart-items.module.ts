import { Module } from '@nestjs/common';

import { CartItemsRepository } from 'src/modules/cart-items/cart-items.repository';
import { CartItemsService } from 'src/modules/cart-items/cart-items.service';

@Module({
  providers: [CartItemsRepository, CartItemsService],
  exports: [CartItemsRepository],
})
export class CartItemsModule {}
