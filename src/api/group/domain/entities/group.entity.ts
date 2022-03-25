import {
  BeforeInsert,
  Column,
  Entity,
  getRepository,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { Conversation } from '../../../conversation/domain/entities/conversation.entity';
import { GroupMembership } from './group_membership.entity';
import { Event } from '../../../event/domain/entities/event.entity';
import { Media } from "../../../media/domain/entities/media.entity";

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

  @BeforeInsert()
  async setConversation() {
    this.conversation = await getRepository(Conversation).save(
      new Conversation(),
    );
  }
}
