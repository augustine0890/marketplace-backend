import { IsEmail, IsNotEmpty } from 'class-validator';
import { isRequired } from '../../constants/validation';

export class AuthUserDto {
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;

  @IsNotEmpty({ message: isRequired('Password') })
  readonly password: string;
}

export class EmailParams {
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;
}
