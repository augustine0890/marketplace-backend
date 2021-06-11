import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../users/entities/user.entity';
import { CustomError } from 'src/common/response';
import { errorCodes } from 'src/common/codes/error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Partial<UserEntity>> {
    try {
      const user = this.authService.validateUser(email, password);
      if (!user) {
        throw new CustomError(
          'Username and password does not match',
          errorCodes.LocalAuthFailed,
          'LocalStrategy.validate',
        );
      }
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
