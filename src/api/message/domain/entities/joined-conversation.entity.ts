import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../user/domain/entities/user.entity";
import { Conversation } from "../../../conversation/domain/entities/conversation.entity";

@Entity()
export class JoinedConversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  socketId: string;

  @ManyToOne(() => User, (user) => user.joinedConversations)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.joinedUsers)
  @JoinColumn()
  conversation: Conversation;
}
