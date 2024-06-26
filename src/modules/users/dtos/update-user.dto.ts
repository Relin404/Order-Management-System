import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User name',
    type: 'string',
    example: 'Sonya Blade',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    type: 'string',
    example: '01223456789',
  })
  @IsOptional()
  @IsNumberString()
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'User refresh token',
    type: 'string',
    example: 'refreshToken',
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
