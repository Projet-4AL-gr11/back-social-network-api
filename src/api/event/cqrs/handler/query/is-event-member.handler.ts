import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEventQuery } from '../../query/get-event.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { Repository } from 'typeorm';
import { IsEventMemberQuery } from '../../query/is-event-member.query';

@QueryHandler(IsEventMemberQuery)
export class IsEventMemberHandler implements IQueryHandler<IsEventMemberQuery> {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async execute(query: IsEventMemberQuery): Promise<boolean> {
    return (
      (await this.eventRepository
        .createQueryBuilder()
        .leftJoin('Event.participants', 'User')
        .where('Event.id=:eventId', { eventId: query.eventId })
        .andWhere('User.id=:userId', { userId: query.userId })
        .getOne()) !== undefined
    );
  }
}
