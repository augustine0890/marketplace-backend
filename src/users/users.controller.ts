import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateAccountInputDto,
  CreateAccountOutputDto,
} from './dto/create-account.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  async findAll() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Account' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createAccount(
    @Body() createUserDto: CreateAccountInputDto,
  ): Promise<CreateAccountOutputDto> {
    return this.usersService.createAccount(createUserDto);
  }
}
