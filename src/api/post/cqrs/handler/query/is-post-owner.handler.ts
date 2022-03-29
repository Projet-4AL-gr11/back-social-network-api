import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { IsPostOwnerQuery } from '../../query/is-post-owner.query';

@QueryHandler(IsPostOwnerQuery)
export class IsPostOwnerHandler implements IQueryHandler<IsPostOwnerQuery> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async execute(query: IsPostOwnerQuery): Promise<boolean> {
    return (
      (await this.postRepository
        .createQueryBuilder()
        .leftJoin('Post.creator', 'User')
        .where('User.id=:userId', { userId: query.userId })
        .andWhere('Post.id=:postId', { postId: query.postId })
        .getOne()) !== undefined
    );
  }
}
