import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UsersRO } from './interfaces/user.interface';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  async findAll(): Promise<UsersRO> {
    return this.usersService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async userProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }
}
