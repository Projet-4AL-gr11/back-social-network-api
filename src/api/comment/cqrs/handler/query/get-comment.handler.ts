import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCommentQuery } from '../../query/get-comment.query';
import { Comment } from '../../../domain/entities/comment.entity';

@QueryHandler(GetCommentQuery)
export class GetCommentHandler implements IQueryHandler<GetCommentQuery> {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async execute(query: GetCommentQuery) {
    return await this.commentRepository.findOne(query.commentId);
  }
}
