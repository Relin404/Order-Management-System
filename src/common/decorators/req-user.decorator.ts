import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ReqUser } from 'src/common/types/req-user.type';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): ReqUser => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data
      ? isNaN(user?.[data])
        ? user?.[data]
        : parseInt(user?.[data])
      : user;
  },
);
