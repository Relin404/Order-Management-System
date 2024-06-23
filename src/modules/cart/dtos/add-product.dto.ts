import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddProductToCartDto {
  @ApiProperty({
    description: 'Cart ID',
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  cartId: number;

  @ApiProperty({
    description: 'Product ID',
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @ApiProperty({
    description: 'Quantity',
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
