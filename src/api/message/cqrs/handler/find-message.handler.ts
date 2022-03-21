import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindMessagesQuery } from '../query/find-messages.query';
import { InjectRepository } from '@nestjs/typeorm';
import Message from '../../domain/entities/message.entity';
import { Repository } from 'typeorm';

@QueryHandler(FindMessagesQuery)
export class FindMessageHandler implements IQueryHandler<FindMessagesQuery> {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  async execute(query: FindMessagesQuery): Promise<Message[]> {
    return this.messagesRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Message.user', 'User')
      .leftJoinAndSelect('User.profilePicture', 'ProfPic')
      .leftJoin('Message.conversation', 'Conversation')
      .where('Conversation.id=:id', { id: query.conversationId })
      .orderBy('Message.createdAt', 'ASC')
      .getMany();
  }
}
