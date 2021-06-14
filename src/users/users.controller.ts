import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UsersRO } from './interfaces/user.interface';
import { Public } from '../auth/decorator/public.decorator';
import { AuthenticatedRequest } from 'src/auth/interfaces/authRequest.interface';
import { SuccessResponse } from 'src/common/response';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  async findAll(): Promise<UsersRO> {
    return this.usersService.getAllUsers();
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async userById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }

  @Public()
  @Get('me')
  async getProfile(
    @Req() request: AuthenticatedRequest,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.usersService.getById(request.user.id);
      return { data };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
