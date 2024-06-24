import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApplyCouponDto } from 'src/modules/orders/dtos/apply-coupon.dto';
import { CreateOrderDto } from 'src/modules/orders/dtos/create-order.dto';
import { UpdateOrderStatusDto } from 'src/modules/orders/dtos/update-order-status.dto';
import { OrdersService } from 'src/modules/orders/orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBody({ type: CreateOrderDto, description: 'Order data' })
  @ApiResponse({ status: 201, description: 'Order created' })
  @ApiBadRequestResponse({ description: 'Cart is empty' })
  @ApiOperation({
    summary: 'Create order',
    operationId: 'createOrder',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.createOrder(
      createOrderDto.userId,
      createOrderDto.addressId,
    );
  }

  @ApiOperation({ summary: 'Get order', operationId: 'getOrder' })
  @ApiParam({ name: 'orderId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Order found' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @Get('/:orderId')
  async getOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return await this.ordersService.getOrder(orderId);
  }

  @ApiOperation({
    summary: 'Update order status',
    operationId: 'updateOrderStatus',
  })
  @ApiParam({ name: 'orderId', type: 'number' })
  @ApiBody({ type: UpdateOrderStatusDto, description: 'Order status' })
  @ApiResponse({ status: 200, description: 'Order status updated' })
  @ApiNotFoundResponse({ description: 'Order not found' })
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

  @ApiOperation({ summary: 'Apply coupon', operationId: 'applyCoupon' })
  @ApiBody({ type: ApplyCouponDto, description: 'Coupon data' })
  @ApiResponse({ status: 200, description: 'Coupon applied' })
  @Post('/apply-coupon')
  async applyCoupon(@Body() applyCouponDto: ApplyCouponDto) {
    return await this.ordersService.applyCoupon(applyCouponDto);
  }
}
