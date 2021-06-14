import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { errorCodes, errorTypes } from 'src/common/codes/error';
import { CustomException } from 'src/common/response';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err: any, user: any, _info: any, _context: any, _status: any) {
    if (err || !user) {
      throw new CustomException(
        {
          message: 'Authentication Failed',
          code: errorCodes.RefreshAuthFailed,
          context: 'JwtRefreshGuard.handleRequest',
          type: errorTypes[errorCodes.RefreshAuthFailed],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
