import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { CartItemsModule } from './modules/cart-items/cart-items.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { ProductsModule } from 'src/modules/products/products.module';
import { CartModule } from 'src/modules/cart/cart.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
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
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
