import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'User name',
    type: 'string',
    example: 'Johnny Cage',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

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
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'password too weak',
    },
  )
  password: string;

  @ApiProperty({
    description: 'User phone number',
    type: 'string',
    example: '01223456789',
  })
  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;
}
