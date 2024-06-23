import { Module } from '@nestjs/common';
import { CartModule } from 'src/modules/cart/cart.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UsersService } from 'src/modules/users/users.service';

@Module({
  imports: [CartModule, OrdersModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
