import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserIfRefreshTokenMatchesQuery } from '../query/get-user-if-refresh-token-matches.query';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';

@QueryHandler(GetUserIfRefreshTokenMatchesQuery)
export class GetUserIfRefreshTokenMatchesHandler
  implements IQueryHandler<GetUserIfRefreshTokenMatchesQuery>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
  ) {}

  async execute(query: GetUserIfRefreshTokenMatchesQuery): Promise<User> {
    try {
      const user = await this.userRepository.findOne(query.userId);

      const isRefreshTokenMatching = await bcrypt.compare(
        query.refreshToken,
        user.currentHashedRefreshToken,
      );

      if (isRefreshTokenMatching) {
        return user;
      }
    } catch (error) {
      this.eventBus.publish(
        new ErrorsEvent('GetUserIfRefreshTokenMatchesHandler', error),
      );
    }
  }
}
