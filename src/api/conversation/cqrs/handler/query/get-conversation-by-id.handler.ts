import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetMembersFriendOneQuery } from '../../query/get-members-friend-one.query';
import { Conversation } from '../../../domain/entities/conversation.entity';
import { GetConversationByIdQuery } from '../../query/get-conversation-by-id.query';

@QueryHandler(GetConversationByIdQuery)
export class GetConversationByIdHandler
  implements IQueryHandler<GetConversationByIdQuery>
{
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async execute(query: GetMembersFriendOneQuery): Promise<Conversation> {
    return this.conversationRepository.findOne(query.conversationId);
  }
}
