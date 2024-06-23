import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsNumberString, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User name',
    type: 'string',
    example: 'Sonya Blade',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'User email',
    type: 'string',
    format: 'email',
    example: 'sonyablade12@gmail.com',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'User password',
    type: 'string',
    example: 'Password123!',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    type: 'string',
    example: '01223456789',
  })
  @IsOptional()
  @IsNumberString()
  phoneNumber: string;
}
