import { Column, Entity } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity extends CoreEntity {
  @IsNotEmpty()
  @Column()
  name!: string;

  @IsNotEmpty()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  @IsString()
  @MinLength(6)
  password: string;
}
