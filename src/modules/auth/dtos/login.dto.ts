import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    type: 'string',
    format: 'email',
    example: 'ballbuster69@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    type: 'string',
    example: 'Password123!',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 24)
  password: string;
}
