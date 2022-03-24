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

  @BeforeInsert()
  async setConversation() {
    this.conversation = await getRepository(Conversation).save(
      new Conversation(),
    );
  }
}
