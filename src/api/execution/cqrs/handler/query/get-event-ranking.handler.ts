import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetEventRankingQuery } from '../../query/get-event-ranking.query';
import { EventRanking } from '../../../domain/entities/event-ranking.entity';

@QueryHandler(GetEventRankingQuery)
export class GetEventRankingHandler
  implements IQueryHandler<GetEventRankingQuery>
{
  constructor(
    @InjectRepository(EventRanking)
    private eventRankingRepository: Repository<EventRanking>,
  ) {}

  async execute(query: GetEventRankingQuery): Promise<EventRanking[]> {
    return await this.eventRankingRepository
      .createQueryBuilder()
      .leftJoin('EventRanking.event', 'Event')
      .leftJoinAndSelect('EventRanking.user', 'User')
      .where('Event.id=:id', { id: query.eventId })
      .orderBy('EventRanking.score', 'DESC')
      .getMany();
  }
}
