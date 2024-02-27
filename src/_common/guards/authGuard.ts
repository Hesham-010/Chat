import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { verifyToken } from 'src/utils/token';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    let token;
    if (ctx.req.headers.authorization || ctx.req.headers.Authorization) {
      token = ctx.req.headers.authorization.split(' ')[1];
    } else {
      throw new UnauthorizedException();
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      throw new UnauthorizedException();
    }
    const user = await User.findByPk(decoded.user);

    ctx.req = user;

    return true;
  }
}
