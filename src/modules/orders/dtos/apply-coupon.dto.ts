import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class ApplyCouponDto {
  @ApiProperty({
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @ApiProperty({
    type: 'number',
    example: 0.25,
  })
  @IsNotEmpty()
  @IsNumber()
  discount: number;
}
