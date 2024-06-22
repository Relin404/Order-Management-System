import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/modules/users/users.module';
import { CartItemsModule } from './modules/cart-items/cart-items.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { ProductsModule } from 'src/modules/products/products.module';
import { CartModule } from 'src/modules/carts/cart.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    CartModule,
    CartItemsModule,
    OrdersModule,
    OrderItemsModule,
    ProductsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
