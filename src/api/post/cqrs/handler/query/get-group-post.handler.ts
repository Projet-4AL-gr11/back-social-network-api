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
      .leftJoinAndSelect('Post.group', 'Group')
      .leftJoinAndSelect('Group.picture', 'Media')
      .leftJoinAndSelect('Post.creator', 'User')
      .where('Group.id=:id', { id: query.groupId })
      .skip(query.offset)
      .take(query.limit)
      .getMany();
  }
}
