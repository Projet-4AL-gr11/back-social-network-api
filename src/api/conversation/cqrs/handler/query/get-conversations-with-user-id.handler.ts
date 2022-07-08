import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../../../domain/entities/conversation.entity';
import { Repository } from 'typeorm';
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
      .leftJoinAndSelect('FriendOne.profilePicture', 'FriendOneProfilePicture')
      .leftJoinAndSelect('FriendTwo.profilePicture', 'FriendTwoProfilePicture')
      .leftJoinAndSelect('Conversation.messages', 'Messages')
      .leftJoinAndSelect('Conversation.group', 'Group')
      .leftJoinAndSelect('Group.members', 'GroupMembership')
      .leftJoinAndSelect('Group.picture', 'Picture')
      .leftJoinAndSelect('GroupMembership.user', 'Member')
      .leftJoinAndSelect('Conversation.users', 'GroupTchat')
      .leftJoinAndSelect('GroupTchat.profilePicture', 'UserProfilePicture')
      .where('FriendOne.id=:id', { id: query.userId })
      .orWhere('FriendTwo.id=:id', { id: query.userId })
      .orWhere('Member.id=:id', { id: query.userId })
      .orWhere('GroupTchat.id=:id', { id: query.userId })
      .orderBy('Conversation.updatedAt', 'DESC')
      .getMany();
  }
}
