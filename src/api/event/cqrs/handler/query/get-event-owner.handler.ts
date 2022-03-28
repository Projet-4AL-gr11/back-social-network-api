import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetEventOwnerQuery } from '../../query/get-event-owner.query';
import { User } from '../../../../user/domain/entities/user.entity';

@QueryHandler(GetEventOwnerQuery)
export class GetEventOwnerHandler implements IQueryHandler<GetEventOwnerQuery> {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {}

  async execute(query: GetEventOwnerQuery): Promise<User> {
    return await this.userRepository
      .createQueryBuilder()
      .leftJoin('User.createdEvents', 'Event')
      .where('Event.id=:eventId', { eventId: query.eventId })
      .getOne();
  }
}
