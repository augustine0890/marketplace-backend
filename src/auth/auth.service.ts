import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { getRefreshTokenKey } from 'src/utils';
import { RedisService } from '../common/modules/redis/redis.service';
import PostgresErrorCode from 'src/config/postgresErrorCode.enum';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from '../auth/interfaces/authResponse.interface';
import { UserEntity } from 'src/users/entities/user.entity';
import { AppEnv, AuthEnv } from 'src/config';
import { ConfigService } from '@nestjs/config';
import { AuthTokenPayload } from './interfaces/tokenPayload.interface';
import { CreateAccountInputDto } from 'src/users/dto/create-account.dto';

@Injectable()
export class AuthService {
  appConfig: AppEnv;
  authConfig: AuthEnv;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cache: RedisService,
    configService: ConfigService,
  ) {
    this.appConfig = configService.get<AppEnv>('app');
    this.authConfig = configService.get<AuthEnv>('auth');
  }

  public async register(registrationInput: CreateAccountInputDto) {
    const hashedPassword = await bcrypt.hash(registrationInput.password, 10);
    try {
      const createdAccount = await this.usersService.createAccount({
        ...registrationInput,
        password: hashedPassword,
      });
      return createdAccount;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        console.error(error);
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async login(user: Partial<UserEntity>): Promise<AuthResponse> {
    return this.getAuthToken(user);
  }

  async getAuthToken({
    id,
    email,
  }: Partial<{
    id: number;
    email: string;
  }>): Promise<AuthResponse> {
    if (!id || !email) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
    const tid = nanoid(5);
    const jwtAccessTokenPayload = { email, sub: id, tid };
    // const jwtRefreshTokenPayload = { email, sub: id, tid };

    const accessToken = this.jwtService.sign(
      jwtAccessTokenPayload,
      this.authConfig.jwtAccessTokenOptions,
    );

    // const refreshToken = this.jwtService.sign(
    // jwtRefreshTokenPayload,
    // this.authConfig.jwtAccessTokenOptions,
    // );
    return {
      id,
      email,
      expires_in: this.authConfig.jwtAccessTokenOptions.expiresIn,
      access_token: accessToken,
      // refresh_token: refreshToken,
      token_type: 'Bearer',
    };
  }

  async isRefreshTokenPayloadValid(
    payload: AuthTokenPayload,
  ): Promise<boolean> {
    const tokenId = await this.getRefreshToken(payload.sub);
    return tokenId && tokenId === payload.tid ? true : false;
  }

  async getRefreshToken(userId: number) {
    return this.cache.get(getRefreshTokenKey(userId));
  }

  public async validateUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatch = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatch) {
      throw new HttpException(
        'Wrong credentials (password) provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
