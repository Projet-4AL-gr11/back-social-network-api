import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { IsLikedPostQuery } from '../../query/is-liked-post.query';

@QueryHandler(IsLikedPostQuery)
export class IsLikedPostHandler implements IQueryHandler<IsLikedPostQuery> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async execute(query: IsLikedPostQuery): Promise<boolean> {
    return (
      (await this.postRepository
        .createQueryBuilder()
        .leftJoin('Post.likes', 'User')
        .where('Post.id=:postId', { postId: query.postId })
        .andWhere('User.id=:userId', { userId: query.userId })
        .getOne()) !== undefined
    );
  }
}
