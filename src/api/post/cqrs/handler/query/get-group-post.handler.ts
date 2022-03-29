import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { GetGroupPostQuery } from '../../query/get-group-post.query';

@QueryHandler(GetGroupPostQuery)
export class GetGroupPostHandler implements IQueryHandler<GetGroupPostQuery> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async execute(query: GetGroupPostQuery) {
    return await this.postRepository
      .createQueryBuilder()
      .leftJoin('Post.group', 'Group')
      .where('Group.id=:id', { id: query.groupId })
      .getMany();
  }
}
