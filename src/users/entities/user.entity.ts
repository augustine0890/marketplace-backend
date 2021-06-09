import { Column, Entity } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';

@Entity()
export class User extends CoreEntity {
  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsString()
  @MinLength(6)
  password: string;
}
