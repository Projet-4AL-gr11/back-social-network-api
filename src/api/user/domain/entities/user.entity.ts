import {
  BaseEntity,
  Column,
  Entity,
  BeforeInsert,
  OneToMany,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UserType } from '../enum/user-type.enum';
import * as bcrypt from 'bcrypt';
import { FriendRequest } from '../../../friend-request/domain/entities/friendship-request.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.user, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  friendRequests: FriendRequest[];
  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  requestedFriends: FriendRequest[];

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await bcrypt.hash(password || this.password, 10);
  }
}
