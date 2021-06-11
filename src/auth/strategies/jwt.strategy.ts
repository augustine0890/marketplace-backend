import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserAuthPayload } from '../interfaces/authRequest.interface';
import { auth } from '../../config';
import { AuthTokenPayload } from '../interfaces/tokenPayload.interface';
const config = auth();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtAccessTokenOptions.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  async validate(payload: AuthTokenPayload): Promise<UserAuthPayload> {
    return { id: payload.sub, email: payload.email };
  }
}
