import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Conversation } from '../../../conversation/domain/entities/conversation.entity';

@Entity()
class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  public content: string;

  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  public author: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @CreateDateColumn()
  public createdAt: Date;
}

export default Message;
