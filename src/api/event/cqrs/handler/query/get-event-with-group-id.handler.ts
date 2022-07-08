import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { Repository } from 'typeorm';
import { GetEventWithEventIdQuery } from '../../query/get-event-with-event-id.query';

@QueryHandler(GetEventWithEventIdQuery)
export class GetEventWithGroupIdHandler
  implements IQueryHandler<GetEventWithEventIdQuery>
{
  constructor(
    @InjectRepository(Event)
    public eventRepository: Repository<Event>,
  ) {}

  async execute(query: GetEventWithEventIdQuery): Promise<Event[]> {
    return await this.eventRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Event.group', 'Group')
      .leftJoinAndSelect('Event.user', 'Owner')
      .where('Group.id=:id', { id: query.groupId })
      .orderBy('Event.createdAt', 'DESC')
      .skip(query.offset)
      .take(query.limit)
      .getMany();
  }
}
