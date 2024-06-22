import { Controller, HttpCode } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dtos/login.dto';
import { SignupDto } from 'src/modules/auth/dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignupDto, description: 'User data' })
  @ApiOperation({ summary: 'Public' })
  @ApiConflictResponse({ description: 'User already exists' })
  @HttpCode(201)
  async signup(signUpDto: SignupDto) {
    return await this.authService.signup(signUpDto);
  }

  async login(loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
