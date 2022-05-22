import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEventQuery } from '../../query/get-event.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetEventQuery)
export class GetEventHandler implements IQueryHandler<GetEventQuery> {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  execute(query: GetEventQuery): Promise<any> {
    if (query.eventId) {
      return this.eventRepository.findOne(query.eventId);
    }
    return this.eventRepository.find();
  }
}
