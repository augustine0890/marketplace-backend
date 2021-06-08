import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInputDto,
  CreateAccountOutputDto,
} from './dto/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.userRespository.find();
  }

  async getUser(id: number): Promise<any> {
    const user = await this.userRespository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async createAccount({
    name,
    email,
    password,
  }: CreateAccountInputDto): Promise<CreateAccountOutputDto> {
    try {
      const exists = await this.userRespository.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
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
