import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderItemsModule } from 'src/modules/order-items/order-items.module';
import { CartModule } from 'src/modules/carts/cart.module';
import { OrdersRepository } from 'src/modules/orders/orders.repository';

@Module({
  imports: [CartModule, OrderItemsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
