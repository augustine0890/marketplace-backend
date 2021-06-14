import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { auth } from '../config/auth';
import { JwtRefreshStrategy } from './strategies/refresh.strategy';
import { RedisModule } from 'src/common/modules/redis/redis.module';

const config = auth();
@Module({
  imports: [
    UsersModule,
    PassportModule,
    RedisModule,
    JwtModule.register({
      secret: config.jwtAccessTokenOptions.secret,
      signOptions: {
        expiresIn: config.jwtAccessTokenOptions.expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
