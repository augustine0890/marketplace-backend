import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorator/public.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterInputDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedRequest } from './interfaces/authRequest.interface';
import { AuthResponse } from './interfaces/authResponse.interface';
import { SuccessResponseDTO } from 'src/common/response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: RegisterInputDto,
    description: 'Successfully Registered',
  })
  async register(@Body() registerInput: RegisterInputDto) {
    return this.authService.register(registerInput);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async emailLogin(
    @Req() request: AuthenticatedRequest<any, Partial<UserEntity>>,
  ): Promise<SuccessResponseDTO<AuthResponse>> {
    try {
      const data = await this.authService.login(request.user);
      return { data };
    } catch (error) {
      throw new HttpException('Something wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
