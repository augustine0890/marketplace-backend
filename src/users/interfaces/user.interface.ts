import { UserEntity } from '../entities/user.entity';

export type UserRO = Partial<UserEntity>;
export type UsersRO = Partial<UserEntity>[];
