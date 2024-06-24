import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dtos/login.dto';
import { SignupDto } from 'src/modules/auth/dtos/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Signup', operationId: 'signup' })
  @ApiBody({ type: SignupDto, description: 'User data' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiConflictResponse({ description: 'User already exists' })
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  async signup(@Body() signUpDto: SignupDto) {
    return await this.authService.signup(signUpDto);
  }

  @ApiOperation({ summary: 'Login', operationId: 'login' })
  @ApiBody({ type: LoginDto, description: 'User credentials' })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Invalid credentials' })
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
