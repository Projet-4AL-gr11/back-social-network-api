import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetConversationByIdQuery } from '../../query/get-conversation-by-id.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../../../domain/entities/conversation.entity';
import { Repository } from 'typeorm';
import { GetMembersFriendOneQuery } from '../../query/get-members-friend-one.query';
import { GetConversationsWithUserIdQuery } from '../../query/get-conversations-with-user-id.query';

@QueryHandler(GetConversationsWithUserIdQuery)
export class GetConversationsWithUserIdHandler
  implements IQueryHandler<GetConversationsWithUserIdQuery>
{
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async execute(
    query: GetConversationsWithUserIdQuery,
  ): Promise<Conversation[]> {
    return this.conversationRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Conversation.friendship', 'Friendship')
      .leftJoinAndSelect('Friendship.friendOne', 'FriendOne')
      .leftJoinAndSelect('Friendship.friendTwo', 'FriendTwo')
      .leftJoinAndSelect('Conversation.messages', 'Messages')
      .leftJoinAndSelect('Conversation.group', 'Group')
      .leftJoinAndSelect('Group.members', 'GroupMembership')
      .leftJoinAndSelect('GroupMembership.user', 'Member')
      .where('FriendOne.id=:id', { id: query.userId })
      .orWhere('FriendTwo.id=:id', { id: query.userId })
      .orWhere('Member.id=:id', { id: query.userId })
      .getMany();
  }
}
