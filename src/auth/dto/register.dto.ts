import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class RegisterInputDto extends PickType(User, [
  'name',
  'email',
  'password',
]) {}
