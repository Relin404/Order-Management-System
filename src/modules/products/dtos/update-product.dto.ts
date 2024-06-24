import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Product name',
    type: 'string',
    example: 'T-shirt',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Product description',
    type: 'string',
    example: 'A nice T-shirt',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Product price',
    type: 'number',
    example: 25.99,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    description: 'Product stock',
    type: 'number',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  stock?: number;
}
