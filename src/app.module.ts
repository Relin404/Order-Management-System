import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { CartItemsModule } from './modules/cart-items/cart-items.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { ProductsModule } from 'src/modules/products/products.module';
import { CartModule } from 'src/modules/carts/cart.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CartModule,
    CartItemsModule,
    OrdersModule,
    OrderItemsModule,
    PrismaModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}
