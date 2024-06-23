import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'User ID',
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Address ID',
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  addressId: number;
}
