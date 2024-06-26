import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ReqUser } from 'src/common/types/req-user.type';
import { JwtPayload } from 'src/modules/auth/types/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies['accessToken'],
      ]),
      secretOrKey: configService.get('jwt.accessToken.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.expiration < Date.now() / 1000)
      throw new ForbiddenException('Token has expired');

    const user: ReqUser = {
      id: payload.sub,
      email: payload.email,
    };

    return user;
  }
}
