import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { errorCodes, errorTypes } from 'src/common/codes/error';
import { Exception } from 'src/common/response';
import {
  IS_LOCAL_AUTHENTICATED,
  IS_PUBLIC_KEY,
} from '../../auth/decorator/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const isLocalAuthenticated = this.reflector.getAllAndOverride<boolean>(
      IS_LOCAL_AUTHENTICATED,
      [context.getHandler(), context.getClass()],
    );
    if (isLocalAuthenticated) {
      return true;
    }
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err: any, user: any, _info: any, context: any, status: any) {
    if (err || !user) {
      throw new Exception(
        {
          message: 'Authentication Failed',
          code: errorCodes.AuthFailed,
          context: 'JwtAuthGuard.handleRequest',
          type: errorTypes[errorCodes.AuthFailed],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
