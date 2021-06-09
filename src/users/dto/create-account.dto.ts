import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateAccountInputDto extends PickType(User, [
  'name',
  'email',
  'password',
]) {}
