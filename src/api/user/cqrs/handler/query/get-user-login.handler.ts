import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserLoginQuery } from '../../query/get-user-login.query';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { config } from 'dotenv';

config();
@QueryHandler(GetUserLoginQuery)
export class GetUserLoginHandler implements IQueryHandler<GetUserLoginQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
  ) {}

  async execute(query: GetUserLoginQuery): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: [{ username: query.username }],
        select: ['id', 'username', 'password'],
      });
    } catch (error) {
      throw 'Error: no match found';
    }
  }
}
