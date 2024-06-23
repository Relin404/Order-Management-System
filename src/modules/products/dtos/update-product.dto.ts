import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Product name',
    type: 'string',
    example: 'T-shirt',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Product description',
    type: 'string',
    example: 'A nice T-shirt',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Product price',
    type: 'number',
    example: 25.99,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'Product stock',
    type: 'number',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  stock?: number;
}
