import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class ApplyCouponDto {
  @ApiProperty({
    description: 'Order ID',
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @ApiProperty({
    description: 'Discount percentage',
    type: 'number',
    example: 0.25,
  })
  @IsNotEmpty()
  @IsNumber()
  discount: number;
}
