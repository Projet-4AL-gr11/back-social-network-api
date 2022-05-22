import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { Repository } from 'typeorm';
import { SearchEventWithNameQuery } from '../../query/search-event-with-name.query';

@QueryHandler(SearchEventWithNameQuery)
export class SearchEventWithNameHandler
  implements IQueryHandler<SearchEventWithNameQuery>
{
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async execute(query: SearchEventWithNameQuery): Promise<Event[]> {
    return await this.eventRepository
      .createQueryBuilder()
      .where('event.name like :name', { name: '%' + query.name + '%' })
      .getMany();
  }
}
