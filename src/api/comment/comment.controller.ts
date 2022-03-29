import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './domain/entities/comment.entity';
import { RequestUser } from '../auth/interface/request-user.interface';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}
  //TODO: Ajouter AddGard

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Comment> {
    return this.commentService.getById(id);
  }

  @Post(':id')
  async create(
    @Req() request: RequestUser,
    @Param('id') postId: string,
    @Body() text: string,
  ) {
    const { user } = request;
    return this.commentService.create(user.id, postId, text);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.commentService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') commentId: string,
    @Body() text: string,
  ): Promise<Comment> {
    return this.commentService.update(commentId, text);
  }
}
