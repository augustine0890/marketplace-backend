import { PickType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

export class CreateAccountInputDto extends PickType(User, [
  'name',
  'email',
  'password',
]) {}

export class CreateAccountOutputDto extends CoreOutput {}
