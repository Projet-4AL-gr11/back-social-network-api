import {
  BaseEntity,
  Column,
  Entity,
  BeforeInsert,
  OneToMany,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UserType } from '../enum/user-type.enum';
import * as bcrypt from 'bcrypt';
import { FriendshipRequest } from '../../../friendship/domain/entities/friendship-request.entity';
import { Friendship } from '../../../friendship/domain/entities/friendship.entity';
import { Exclude } from 'class-transformer';
import Message from '../../../message/domain/entities/message.entity';
import { Media } from '../../../media/domain/entities/media.entity';
import { GroupMembership } from "../../../group/domain/entities/group_membership.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsEmail()
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: false, nullable: false, select: false })
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

  @Column({
    nullable: true,
    select: false,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @OneToMany(() => Friendship, (friendship) => friendship.friendOne, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  friendsOne: Friendship[];
  @OneToMany(() => Friendship, (friendship) => friendship.friendTwo, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  friendsTwo: Friendship[];

  @OneToMany(() => FriendshipRequest, (friendRequest) => friendRequest.user, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  friendRequests: FriendshipRequest[];
  @OneToMany(() => FriendshipRequest, (friendRequest) => friendRequest.sender, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  requestedFriends: FriendshipRequest[];

  @OneToMany(() => Message, (message) => message.author, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  messages: Message[];

  @OneToOne(() => Media, (media) => media.userProfilePicture, {
    nullable: true,
    eager: true,
    cascade: true,
    onDelete: 'SET NULL',
  })

  // Media
  @JoinColumn()
  profilePicture: Media;
  @OneToOne(() => Media, (media) => media.userBanner, {
    nullable: true,
    eager: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  bannerPicture: Media;

  //Group
  @OneToMany(() => GroupMembership, group => group.user, {cascade: true, onDelete:'CASCADE'})
  groups: GroupMembership[];

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await bcrypt.hash(password || this.password, 10);
  }
}
