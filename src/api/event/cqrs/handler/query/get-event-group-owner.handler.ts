import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEventOwnerQuery } from '../../query/get-event-owner.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../user/domain/entities/user.entity';
import { GetEventGroupOwnerQuery } from "../../query/get-event-group-owner.query";

@QueryHandler(GetEventGroupOwnerQuery)
export class GetEventGroupOwnerHandler
  implements IQueryHandler<GetEventGroupOwnerQuery>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: GetEventGroupOwnerQuery): Promise<any> {
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
