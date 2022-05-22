import {
  BeforeInsert,
  Column,
  Entity,
  getRepository,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { Conversation } from '../../../conversation/domain/entities/conversation.entity';
import { GroupMembership } from './group_membership.entity';
import { Event } from '../../../event/domain/entities/event.entity';
import { Media } from '../../../media/domain/entities/media.entity';
import { Post } from '../../../post/domain/entities/post.entity';
import { User } from '../../../user/domain/entities/user.entity';
import { Report } from '../../../report/domain/entities/report.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Length(5, 30)
  @Column({ nullable: false, unique: true })
  name: string;
  @OneToMany(() => GroupMembership, (user) => user.group, { cascade: true })
  members: GroupMembership[];

  @OneToOne(() => Conversation, (conversation) => conversation.group, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn()
  conversation: Conversation;

  @OneToMany(() => Event, (event) => event.group, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  events: Event[];

  @OneToOne(() => Media, (media) => media.groupPicture, {
    cascade: true,
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  picture: Media;

  @OneToMany(() => Post, (post) => post.group)
  posts: Post[];

  @ManyToMany(() => User, (user) => user.followedGroups, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  followers: User[];

  @OneToMany(() => Report, (report) => report.reportedGroup, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  reported: Report[];

  @BeforeInsert()
  async setConversation() {
    this.conversation = await getRepository(Conversation).save(
      new Conversation(),
    );
  }
}
