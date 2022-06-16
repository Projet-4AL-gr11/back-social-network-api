import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPostQuery } from '../../query/get-post.query';
import { Post } from '../../../domain/entities/post.entity';

@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async execute(query: GetPostQuery) {
    if (query.postId) {
      return await this.postRepository
        .createQueryBuilder()
        .where('Post.id=:id', { id: query.postId })
        .getOne();
    }
    return this.postRepository.find();
  }
}
