import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsRepository } from 'src/modules/order-items/order-items.repository';

@Module({
  providers: [OrderItemsRepository, OrderItemsService],
  exports: [OrderItemsRepository],
})
export class OrderItemsModule {}
