import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../../domain/entities/comment.entity';
import { Repository } from 'typeorm';
import { GetCommentsWithPostIdQuery } from '../../query/get-comments-with-post-id.query';

@QueryHandler(GetCommentsWithPostIdQuery)
export class GetCommentsWithPostIdHandler
  implements IQueryHandler<GetCommentsWithPostIdQuery>
{
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async execute(query: GetCommentsWithPostIdQuery) {
    return await this.commentRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Comment.creator', 'User')
      .leftJoinAndSelect('User.profilePicture', 'ProfPic')
      .leftJoinAndSelect('Comment.medias', 'Media')
      .leftJoin('Comment.post', 'Post')
      .where('Post.id=:postId', { postId: query.postId })
      .orderBy('Comment.createdAt', 'DESC')
      .getMany();
  }
}
