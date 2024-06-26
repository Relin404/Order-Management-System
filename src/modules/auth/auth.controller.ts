import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBody,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { GetUser } from 'src/common/decorators/req-user.decorator';
import { RefreshJwtGuard } from 'src/common/guards/refresh-jwt.guard';
import { ReqUser } from 'src/common/types/req-user.type';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dtos/login.dto';
import { SignupDto } from 'src/modules/auth/dtos/signup.dto';
import { UserWithRefreshToken } from 'src/modules/auth/types/user-with-refresh-token.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Signup', operationId: 'signup' })
  @ApiBody({ type: SignupDto, description: 'User data' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiConflictResponse({ description: 'User already exists' })
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  async signup(
    @Body() signUpDto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, tokens } = await this.authService.signup(signUpDto);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: this.configService.get<number>('jwt.refreshToken.expiresIn'),
      httpOnly: true,
      sameSite: 'none',
    });

    res.cookie('accessToken', tokens.accessToken, {
      maxAge: this.configService.get<number>('jwt.accessToken.expiresIn'),
      httpOnly: true,
      sameSite: 'none',
    });

    return user;
  }

  @ApiOperation({ summary: 'Login', operationId: 'login' })
  @ApiBody({ type: LoginDto, description: 'User credentials' })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Invalid credentials' })
  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, tokens } = await this.authService.login(loginDto);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: this.configService.get<number>('jwt.refreshToken.expiresIn'),
      httpOnly: true,
      sameSite: 'none',
    });

    res.cookie('accessToken', tokens.accessToken, {
      maxAge: this.configService.get<number>('jwt.accessToken.expiresIn'),
      httpOnly: true,
      sameSite: 'none',
    });

    return user;
  }

  @ApiOperation({ summary: 'Logout', operationId: 'logout' })
  @ApiResponse({ status: 204, description: 'User logged out' })
  @Public()
  @Delete('logout')
  async logout(
    @GetUser() user: ReqUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(user.id);

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    return;
  }

  @ApiOperation({ summary: 'Refresh tokens', operationId: 'refreshTokens' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Access denied' })
  @Public()
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshTokens(
    @GetUser() user: UserWithRefreshToken,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      user.id,
      user.refreshToken,
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: this.configService.get<number>('jwt.refreshToken.expiresIn'),
      httpOnly: true,
      sameSite: 'none',
    });

    res.cookie('accessToken', accessToken, {
      maxAge: this.configService.get<number>('jwt.accessToken.expiresIn'),
      httpOnly: true,
      sameSite: 'none',
    });

    return;
  }
}
