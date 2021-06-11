import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class CreateAccountInputDto extends PickType(UserEntity, [
  'name',
  'email',
  'password',
]) {}
