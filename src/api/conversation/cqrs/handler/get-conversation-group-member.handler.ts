import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetConversationGroupMemberQuery } from '../query/get-conversation-group-member.query';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetConversationGroupMemberQuery)
export class GetConversationGroupMemberHandler
  implements IQueryHandler<GetConversationGroupMemberQuery>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: GetConversationGroupMemberQuery): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder()
      .leftJoin('User.groups', 'GroupMembership')
      .leftJoin('GroupMembership.group', 'Group')
      .leftJoin('Group.conversation', 'Conversation')
      .where('Conversation.id=:conversationId', {
        conversationId: query.conversationId,
      })
      .getMany();
  }
}
