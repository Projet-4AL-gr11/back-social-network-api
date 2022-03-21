import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindMessageQuery } from '../query/find-message.query';
import { InjectRepository } from '@nestjs/typeorm';
import Message from '../../domain/entities/message.entity';
import { Repository } from 'typeorm';

@QueryHandler(FindMessageQuery)
export class FindMessageHandler implements IQueryHandler<FindMessageQuery> {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  async execute(query: FindMessageQuery): Promise<Message[]> {
    return this.messagesRepository.find({
      relations: ['author'],
    });
  }
}
