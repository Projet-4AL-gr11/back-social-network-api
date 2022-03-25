import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEventOwnerQuery } from '../../query/get-event-owner.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../domain/entities/event.entity';
import { Repository } from 'typeorm';
import { User } from '../../../../user/domain/entities/user.entity';

@QueryHandler(GetEventOwnerQuery)
export class GetEventGroupOwnerHandler
  implements IQueryHandler<GetEventOwnerQuery>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: GetEventOwnerQuery): Promise<any> {
    return await this.userRepository
      .createQueryBuilder()
      .leftJoin('User.groups', 'GroupMembership')
      .leftJoin('GroupMembership.group', 'Group')
      .leftJoin('Group.events', 'Event')
      .where('Event.id=:eventId', { eventId: query.eventId })
      .andWhere(
        'GroupMembership.isAdmin = true OR GroupMembership.isOwner = true',
      )
      .getMany();
  }
}
