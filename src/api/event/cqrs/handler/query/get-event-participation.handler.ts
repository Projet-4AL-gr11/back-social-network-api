import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEventParticipationQuery } from '../../query/get-event-participation.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../../event/domain/entities/event.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetEventParticipationQuery)
export class GetEventParticipationHandler
  implements IQueryHandler<GetEventParticipationQuery>
{
  constructor(
    @InjectRepository(Event)
    public eventRepository: Repository<Event>,
  ) {}

  async execute(query: GetEventParticipationQuery): Promise<Event[]> {
    return await this.eventRepository
      .createQueryBuilder()
      .leftJoin('Event.participants', 'User')
      .leftJoin('Event.user', 'Owner')
      .where('User.id=:id', { id: query.userId })
      .orWhere('Owner.id=:id', { id: query.userId })
      .orderBy('Event.createdAt', 'DESC')
      .skip(query.offset)
      .take(query.limit)
      .getMany();
  }
}
