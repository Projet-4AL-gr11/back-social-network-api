import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEventMemberQuery } from '../../query/get-event-member.query';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../user/domain/entities/user.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetEventMemberQuery)
export class GetEventMemberHandler
  implements IQueryHandler<GetEventMemberQuery>
{
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {}

  async execute(query: GetEventMemberQuery): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder()
      .leftJoin('User.eventsParticipation', 'Event')
      .where('Event.id=:eventId', { eventId: query.eventId })
      .getMany();
  }
}
