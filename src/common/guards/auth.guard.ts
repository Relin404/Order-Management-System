import { Reflector } from '@nestjs/core';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    if (req.cookies.accessToken) return super.canActivate(context) as boolean;

    return (
      this.reflector.getAllAndOverride('public', [
        context.getHandler(),
        context.getClass(),
      ]) || (super.canActivate(context) as boolean)
    );
  }
}
