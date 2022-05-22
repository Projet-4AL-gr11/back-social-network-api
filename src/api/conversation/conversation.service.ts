import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Conversation } from './domain/entities/conversation.entity';
import { GetConversationByIdQuery } from './cqrs/query/get-conversation-by-id.query';
import { User } from '../user/domain/entities/user.entity';
import { GetMembersFriendOneQuery } from './cqrs/query/get-members-friend-one.query';
import { GetMembersFriendTwoQuery } from './cqrs/query/get-members-friend-two.query';
import { GetConversationGroupMemberQuery } from './cqrs/query/get-conversation-group-member.query';

@Injectable()
export class ConversationService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getMembers(conversationId: string): Promise<User[]> {
    const userList: User[] = [];
    userList.push(
      await this.queryBus.execute(new GetMembersFriendOneQuery(conversationId)),
    );
    userList.push(
      await this.queryBus.execute(new GetMembersFriendTwoQuery(conversationId)),
    );
    userList.push(
      await this.queryBus.execute(
        new GetConversationGroupMemberQuery(conversationId),
      ),
    );
    return userList;
  }

  async getConversationWithId(conversationId: string): Promise<Conversation> {
    return await this.queryBus.execute(
      new GetConversationByIdQuery(conversationId),
    );
  }

  async isMemberOfConversation(
    userId: string,
    conversationId,
  ): Promise<boolean> {
    let isMember = false;
    await this.getMembers(conversationId).then((users) => {
      users.forEach((user) => {
        if (user.id == userId) {
          isMember = true;
        }
      });
    });
    return isMember;
  }
}
