import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInputDto } from './dto/create-account.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRespository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    try {
      const users = await this.userRespository.find();
      return users;
    } catch (error) {
      throw new HttpException(
        'Could not found the users',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getById(id: number) {
    try {
      const user = await this.userRespository.findOneOrFail({ id });
      return user;
    } catch (error) {
      throw new HttpException(
        `User id #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await this.userRespository.findOne({ email });
      if (user) {
        return user;
      }
    } catch (error) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createAccount({ name, email, password }: CreateAccountInputDto) {
    try {
      const exists = await this.userRespository.findOne({ email });
      if (exists) {
        throw new HttpException(
          'There is a user with that email already',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.userRespository.save(
        this.userRespository.create({ name, email, password }),
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Could not create account' };
    }
  }
}
