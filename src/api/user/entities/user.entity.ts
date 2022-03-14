import {
  BaseEntity,
  Column,
  Entity,
  BeforeInsert,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UserType } from '../enum/user-type.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @IsEmail()
  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Length(5, 20)
  @IsNotEmpty()
  @Column({ unique: true, nullable: false, length: 20 })
  username: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.USER,
    nullable: false,
  })
  userType: UserType;

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await hash(password || this.password, 10);
  }
}
