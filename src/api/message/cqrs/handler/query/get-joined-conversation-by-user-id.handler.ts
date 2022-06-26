import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJoinedConversationByConversationIdQuery } from '../../query/get-joined-conversation-by-conversation-id.query';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinedConversation } from '../../../domain/entities/joined-conversation.entity';
import { Repository } from 'typeorm';
import { GetJoinedConversationByUserIdQuery } from '../../query/get-joined-conversation-by-user-id.query';

@QueryHandler(GetJoinedConversationByUserIdQuery)
export class GetJoinedConversationByUserIdHandler
  implements IQueryHandler<GetJoinedConversationByUserIdQuery>
{
  constructor(
    @InjectRepository(JoinedConversation)
    private joinedConversationRepository: Repository<JoinedConversation>,
  ) {}

  async execute(query: GetJoinedConversationByUserIdQuery) {
    return this.joinedConversationRepository
      .createQueryBuilder()
      .leftJoinAndSelect('JoinedConversation.user', 'User')
      .where('User.id=:id', { id: query.userId })
      .getOne();
  }
}
