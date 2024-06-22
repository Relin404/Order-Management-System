import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User name',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'User email',
    type: 'string',
    format: 'email',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'User password',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    type: 'string',
  })
  @IsOptional()
  @IsNumberString()
  phoneNumber: string;
}
