import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/modules/auth/dtos/login.dto';
import { SignupDto } from 'src/modules/auth/dtos/signup.dto';
import { JwtPayload } from 'src/modules/auth/types/jwt-payload.interface';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const user = await this.usersService.create(signupDto);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.validatePassword(
      loginDto.email,
      loginDto.password,
    );

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  async logout(id: number) {
    await this.usersService.update(id, {
      refreshToken: null,
    });
  }

  async refreshTokens(id: number, refreshToken: string) {
    const user = await this.usersService.findOneById(id);

    if (!user.refreshToken) throw new UnauthorizedException('Access denied');

    const refreshTokensMatch = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokensMatch) throw new UnauthorizedException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }

  async getTokens(id: number, email: string) {
    const payload: JwtPayload = {
      sub: id,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.accessToken.secret'),
        expiresIn: this.configService.get<string>('jwt.accessToken.expiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshToken.secret'),
        expiresIn: this.configService.get<string>('jwt.refreshToken.expiresIn'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.usersService.update(id, {
      refreshToken: hashedRefreshToken,
    });
  }
}
