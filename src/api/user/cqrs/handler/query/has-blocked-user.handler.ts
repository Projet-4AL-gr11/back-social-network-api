import { EventBus, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IsBlockedUserQuery } from "../../query/is-blocked-user.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../domain/entities/user.entity";
import { Repository } from "typeorm";
import { ErrorsEvent } from "../../../../../util/error/errorsEvent";
import { HasBlockedUserQuery } from "../../query/has-blocked-user.query";

@QueryHandler(HasBlockedUserQuery)
export class HasBlockedUserHandler
  implements IQueryHandler<HasBlockedUserQuery>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
  ) {}

  async execute(query: HasBlockedUserQuery): Promise<boolean> {
    try {
      return (
        (await this.userRepository
          .createQueryBuilder()
          .leftJoin('User.blockedUsers', 'Blocked')
          .where('Blocked.id=:blocked', { blocked: query.userId })
          .andWhere('User.id=:blocker', { blocker: query.currentUser })
          .getOne()) !== undefined
      );
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('HasBlockedUserHandler', error));
    }
  }
}
