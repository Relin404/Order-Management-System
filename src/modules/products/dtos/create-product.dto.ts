import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    type: 'string',
    example: 'T-shirt',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product description',
    type: 'string',
    example: 'A nice T-shirt',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Product price',
    type: 'number',
    example: 25.99,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Product stock',
    type: 'number',
    example: 10,
  })
  @IsNotEmpty()
  @IsInt()
  stock: number;
}
