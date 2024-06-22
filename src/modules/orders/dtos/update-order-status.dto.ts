import { IsEnum, IsNotEmpty } from 'class-validator';

export enum Status {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
