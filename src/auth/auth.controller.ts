import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterInputDto } from './dto/register.dto';
// import { LocalAuthGuard } from './guards/local-auth.guard';
// import { RequestWithUser } from './interfaces/requestWithUser.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: RegisterInputDto,
    description: 'Successfully Registered',
  })
  async register(@Body() registerInput: RegisterInputDto) {
    return this.authService.register(registerInput);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalAuthGuard)
  async login(@Req() request) {
    const { user } = request;
    console.log(user);
    // const cookie = this.authService.getCookieWithJwtToken(user.id);
    // request.res.setHeader('Set-Cookie', cookie);
    // user.password = undefined;
    return user;
  }
}
