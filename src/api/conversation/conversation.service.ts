import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Conversation } from './domain/entities/conversation.entity';
import { GetConversationByIdQuery } from './cqrs/query/get-conversation-by-id.query';
import { User } from '../user/domain/entities/user.entity';
import { GetMembersFriendOneQuery } from './cqrs/query/get-members-friend-one.query';
import { GetMembersFriendTwoQuery } from './cqrs/query/get-members-friend-two.query';
import { GetConversationGroupMemberQuery } from './cqrs/query/get-conversation-group-member.query';
import { GetConversationsWithUserIdQuery } from './cqrs/query/get-conversations-with-user-id.query';
import { ConversationDto } from './domain/dto/conversation.dto';
import { GetUserQuery } from '../user/cqrs/query/get-user.query';
import { CreateConversationCommand } from './cqrs/command/create-conversation.command';

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

  async getConversationsWithUserId(id: string): Promise<Conversation[]> {
    return await this.queryBus.execute(new GetConversationsWithUserIdQuery(id));
  }

  async createConversation(conversationDto: ConversationDto, user: string) {
    const userList: User[] = [];
    conversationDto.users.push(user);
    for (const userId of conversationDto.users) {
      userList.push(await this.queryBus.execute(new GetUserQuery(userId)));
    }
    return this.commandBus.execute(new CreateConversationCommand(userList));
  }
}
