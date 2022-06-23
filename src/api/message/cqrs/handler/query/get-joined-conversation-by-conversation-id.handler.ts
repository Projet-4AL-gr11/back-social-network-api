import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetConnectedUserQuery } from '../../query/get-connected-user.query';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedUser } from '../../../domain/entities/connected-user.entity';
import { Repository } from 'typeorm';
import { GetJoinedConversationByConversationIdQuery } from '../../query/get-joined-conversation-by-conversation-id.query';
import { JoinedConversation } from '../../../domain/entities/joined-conversation.entity';

@QueryHandler(GetJoinedConversationByConversationIdQuery)
export class GetJoinedConversationByConversationIdHandler
  implements IQueryHandler<GetJoinedConversationByConversationIdQuery>
{
  constructor(
    @InjectRepository(JoinedConversation)
    private joinedConversationRepository: Repository<JoinedConversation>,
  ) {}

  async execute(query: GetJoinedConversationByConversationIdQuery) {
    return this.joinedConversationRepository
      .createQueryBuilder()
      .leftJoinAndSelect('JoinedConversation.conversation', 'Conversation')
      .where('Conversation.id=:id', { id: query.conversationId })
      .getOne();
  }
}
