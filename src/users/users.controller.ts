import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  async findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async userProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }
}
