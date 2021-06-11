import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UsersRO } from './interfaces/user.interface';
import { Public } from '../auth/decorator/public.decorator';
import { AuthenticatedRequest } from 'src/auth/interfaces/authRequest.interface';
// import { SuccessResponse } from 'src/common/response';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
  async userProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }

  @Public()
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteMe(@Req() request: AuthenticatedRequest) {
    console.log(request.email);
    // const data = await this.usersService.delete(req.user.id);
    // return { data };
  }
}
