import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetConnectedUserQuery } from '../../query/get-connected-user.query';
import { ConnectedUser } from '../../../domain/entities/connected-user.entity';

@QueryHandler(GetConnectedUserQuery)
export class GetConnectedUserHandler
  implements IQueryHandler<GetConnectedUserQuery>
{
  constructor(
    @InjectRepository(ConnectedUser)
    private connectedUserRepository: Repository<ConnectedUser>,
  ) {}

  async execute(query: GetConnectedUserQuery) {
    return this.connectedUserRepository
      .createQueryBuilder()
      .leftJoinAndSelect('ConnectedUser.user', 'User')
      .where('User.id=:id', { id: query.id })
      .getOne();
  }
}
