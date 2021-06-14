import { registerAs } from '@nestjs/config';

export interface AuthEnv {
  jwtAccessTokenOptions: {
    secret: string;
    expiresIn: string;
    // issuer: string;
    // audience: string;
  };
  jwtRefreshTokenOptions: {
    secret: string;
    expiresIn: string;
  };
}

export const auth = (): AuthEnv => ({
  jwtAccessTokenOptions: {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    // issuer: process.env.ISSUER,
    // audience: process.env.AUDIENCE,
  },
  jwtRefreshTokenOptions: {
    secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  },
});

export default registerAs('auth', auth);
