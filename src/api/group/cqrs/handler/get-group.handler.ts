import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGroupQuery } from '../query/get-group.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../domain/entities/group.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetGroupQuery)
export class GetGroupHandler implements IQueryHandler<GetGroupQuery> {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async execute(query: GetGroupQuery): Promise<any> {
    if (query.groupId) {
      return await this.groupRepository.findOne(query.groupId);
    }
    return await this.groupRepository.find();
  }
}
