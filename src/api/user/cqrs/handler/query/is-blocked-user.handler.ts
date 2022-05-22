import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { IsBlockedUserQuery } from '../../query/is-blocked-user.query';

@QueryHandler(IsBlockedUserQuery)
export class IsBlockedUserHandler implements IQueryHandler<IsBlockedUserQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
  ) {}

  async execute(query: IsBlockedUserQuery): Promise<boolean> {
    try {
      return (
        (await this.userRepository
          .createQueryBuilder()
          .leftJoin('User.blockedUsers', 'Blocked')
          .where('Blocked.id=:blocked', { blocked: query.currentUser })
          .andWhere('User.id=:blocker', { blocker: query.userId })
          .getOne()) !== undefined
      );
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('IsBlockedUserHandler', error));
    }
  }
}
