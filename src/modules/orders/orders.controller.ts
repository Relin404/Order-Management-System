import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApplyCouponDto } from 'src/modules/orders/dtos/apply-coupon.dto';
import { CreateOrderDto } from 'src/modules/orders/dtos/create-order.dto';
import { UpdateOrderStatusDto } from 'src/modules/orders/dtos/update-order-status.dto';
import { OrdersService } from 'src/modules/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.createOrder(
      createOrderDto.userId,
      createOrderDto.addressId,
    );
  }

  @Get('/:orderId')
  async getOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return await this.ordersService.getOrder(orderId);
  }

  @Put('/:orderId/status')
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return await this.ordersService.updateOrderStatus(
      orderId,
      updateOrderStatusDto,
    );
  }

  @Post('/apply-coupon')
  async applyCoupon(@Body() applyCouponDto: ApplyCouponDto) {
    return await this.ordersService.applyCoupon(applyCouponDto);
  }
}
