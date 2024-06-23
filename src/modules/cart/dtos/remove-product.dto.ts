import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class RemoveProductFromCartDto {
  @ApiProperty({
    description: 'Product ID',
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  productId: number;
}
