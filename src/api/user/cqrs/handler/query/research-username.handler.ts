import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResearchUsernameQuery } from '../../query/research-username.query';
import { User } from '../../../domain/entities/user.entity';

@QueryHandler(ResearchUsernameQuery)
export class ResearchUsernameHandler
  implements IQueryHandler<ResearchUsernameQuery>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: ResearchUsernameQuery) {
    return this.userRepository
      .createQueryBuilder()
      .where('username like :data', { data: query.name })
      .andWhere('User.id != :id', { id: query.userId })
      .getMany();
  }
}
