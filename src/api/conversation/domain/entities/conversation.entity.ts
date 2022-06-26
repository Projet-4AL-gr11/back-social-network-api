import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Message from '../../../message/domain/entities/message.entity';
import { Friendship } from '../../../friendship/domain/entities/friendship.entity';
import { Group } from '../../../group/domain/entities/group.entity';
import { User } from '../../../user/domain/entities/user.entity';
import { JoinedConversation } from '../../../message/domain/entities/joined-conversation.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Friendship, (friendship) => friendship.conversation)
  friendship: Friendship;

  @OneToMany(() => Message, (message) => message.conversation, {})
  messages: Message[];

  @OneToOne(() => Group, (group) => group.conversation)
  group: Group;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(
    () => JoinedConversation,
    (joinedConversation) => joinedConversation.conversation,
  )
  joinedUsers: JoinedConversation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
