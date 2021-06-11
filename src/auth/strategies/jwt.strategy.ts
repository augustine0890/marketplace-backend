import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserAuthPayload } from '../interfaces/authRequest.interface';
import { auth } from '../../config';
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

  async validate(request: Request, payload): Promise<UserAuthPayload> {
    return { id: payload.sub, email: payload.email };
  }
}
