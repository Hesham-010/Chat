import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verifyToken } from 'src/utils/token';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    let token;
    if (ctx.req.headers.authorization) {
      token = ctx.req.headers.authorization.split(' ')[1];
    } else {
      throw new UnauthorizedException();
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      throw new UnauthorizedException();
    }
    ctx.req = decoded;

    return true;
  }
}
