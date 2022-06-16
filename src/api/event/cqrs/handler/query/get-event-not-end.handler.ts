import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { MoreThan, Repository } from 'typeorm';
import { GetEventNotEndQuery } from '../../query/get-event-not-end.query';

@QueryHandler(GetEventNotEndQuery)
export class GetEventNotEndHandler
  implements IQueryHandler<GetEventNotEndQuery>
{
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  execute(query: GetEventNotEndQuery): Promise<any> {
    return this.eventRepository.find({
      where: {
        endDate: MoreThan(query.dateNow),
      },
      relations: ['group', 'languages', 'user', 'picture'],
    });
  }
}
