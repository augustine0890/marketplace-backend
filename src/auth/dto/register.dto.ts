import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class RegisterInputDto extends PickType(UserEntity, [
  'name',
  'email',
  'password',
]) {}
