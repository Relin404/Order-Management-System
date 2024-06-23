import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCartItemQuantityDto {
  @ApiProperty({
    description: 'Cart item ID',
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  cartItemId: number;

  @ApiProperty({
    description: 'Quantity',
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
