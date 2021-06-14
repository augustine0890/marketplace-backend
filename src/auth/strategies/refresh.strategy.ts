import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { auth } from 'src/config';
import { CustomError } from 'src/common/response';
import { UserAuthPayload } from '../interfaces/authRequest.interface';
import { errorCodes } from 'src/common/codes/error';
const config = auth();

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
      secretOrKey: config.jwtRefreshTokenOptions.secret,
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(request: Request, payload: any): Promise<UserAuthPayload> {
    const isValid = await this.authService.isRefreshTokenPayloadValid(payload);
    if (isValid) {
      return { email: payload.email, id: payload.sub };
    } else {
      throw new CustomError('Refresh token expired', errorCodes.AuthFailed);
    }
  }
}
