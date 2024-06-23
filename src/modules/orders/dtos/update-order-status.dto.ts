import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum Status {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Order status',
    enum: Status,
    example: 'CONFIRMED',
  })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
