import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/modules/auth/types/jwt-payload.interface';
import { UserWithRefreshToken } from 'src/modules/auth/types/user-with-refresh-token.type';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly usersRepository: UsersRepository,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies['refreshToken'],
      ]),
      secretOrKey: configService.get('jwt.refreshToken.secret'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<UserWithRefreshToken> {
    const user = await this.usersRepository.findOne(payload.sub);

    if (!user) throw new UnauthorizedException();

    return {
      ...user,
      refreshToken: req.cookies['refreshToken'],
    };
  }
}
