import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UserType } from '../enum/user-type.enum';
import * as bcrypt from 'bcrypt';
import { FriendshipRequest } from '../../../friendship/domain/entities/friendship-request.entity';
import { Friendship } from '../../../friendship/domain/entities/friendship.entity';
import { Exclude } from 'class-transformer';
import Message from '../../../message/domain/entities/message.entity';
import { Media } from '../../../media/domain/entities/media.entity';
import { GroupMembership } from '../../../group/domain/entities/group_membership.entity';
import { Event } from '../../../event/domain/entities/event.entity';
import { Post } from '../../../post/domain/entities/post.entity';
import { Group } from '../../../group/domain/entities/group.entity';
import { Comment } from '../../../comment/domain/entities/comment.entity';
import { Report } from '../../../report/domain/entities/report.entity';
import { Leaderboard } from '../../../leaderboard/domain/entities/leaderboard.entity';
import { EventRanking } from '../../../leaderboard/domain/entities/event-ranking.entity';

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
    type: 'text',
    nullable: true,
  })
  bio: string;

  @Column({
    nullable: true,
    select: false,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;
  @Exclude()
  public jwtToken?: string;

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
  @OneToMany(() => GroupMembership, (group) => group.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  groups: GroupMembership[];

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await bcrypt.hash(password || this.password, 10);
  }

  @ManyToMany(() => Group, (group) => group.followers)
  @JoinTable()
  followedGroups: Group[];

  // Event
  @OneToMany(() => Event, (event) => event.user)
  createdEvents: Event[];
  @ManyToMany(() => Event, (event) => event.participants, { cascade: true })
  @JoinTable()
  eventsParticipation: Event[];

  @OneToMany(() => EventRanking, (eventRanking) => eventRanking.user)
  eventRanking: EventRanking[];

  //Post
  @ManyToMany(() => Post, (post) => post.likes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  likedPosts: Post[];
  @OneToMany(() => Post, (post) => post.creator, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  createdPosts: Post[];

  // Comment
  @OneToMany(() => Comment, (comment) => comment.creator, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  comments: Comment[];

  //blockédex
  @ManyToMany(() => User, (user) => user.blockedUsers, { onDelete: 'CASCADE' })
  blockers: User[];
  @ManyToMany(() => User, (user) => user.blockers, { cascade: true })
  @JoinTable()
  blockedUsers: User[];

  //Report
  @OneToMany(() => Report, (report) => report.userReporter, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  reports: Report[];

  @OneToMany(() => Report, (report) => report.reportedUser, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  reported: Report[];

  //Leaderboard
  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  leaderboards: Leaderboard[];
}
