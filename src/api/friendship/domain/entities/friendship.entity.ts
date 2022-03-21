import {
  BeforeInsert,
  Entity,
  getRepository,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Conversation } from '../../../conversation/domain/entities/conversation.entity';

@Entity()
export class Friendship {
  @ManyToOne(() => User, (user) => user.friendsOne, {
    primary: true,
    onDelete: 'CASCADE',
  })
  friendOne: User;
  @ManyToOne(() => User, (user) => user.friendsTwo, {
    primary: true,
    onDelete: 'CASCADE',
  })
  friendTwo: User;

  @OneToOne(() => Conversation, (conversation) => conversation, {
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
