import {
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Message from '../../../message/domain/entities/message.entity';
import { Friendship } from '../../../friendship/domain/entities/friendship.entity';
import { Group } from '../../../group/domain/entities/group.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Friendship, (friendship) => friendship.conversation)
  friendship: Friendship;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @OneToOne(() => Group, (group) => group.conversation)
  group: Group;

  @CreateDateColumn()
  createdAt: Date;
}
