import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateAccountInputDto } from 'src/users/dto/create-account.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from 'src/config/postgresErrorCode.enum';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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

  public async getAuthUser(email: string, plainTextPassword: string) {
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
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
