import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
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

  async getUser(id: number): Promise<UserDto> {
    const user = await this.userRespository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async createUser(createUser: UserDto) {
    const user = this.userRespository.create(createUser);
    return this.userRespository.save(user);
  }
}
