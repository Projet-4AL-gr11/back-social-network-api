import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './domain/entities/comment.entity';
import { RequestUser } from '../auth/interface/request-user.interface';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';
import { CommentDto } from "./domain/dto/comment.dto";

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Comment> {
    return this.commentService.getById(id);
  }

  @Get('getPostComments/:id')
  async getCommentWithPostId(@Param('id') id: string): Promise<Comment[]> {
    return this.commentService.getCommentWithPostId(id);
  }

  @Post(':id')
  @UseGuards(JwtRefreshGuard)
  async create(
    @Req() request: RequestUser,
    @Param('id') postId: string,
    @Body() commentDto: CommentDto,
  ) {
    const { user } = request;
    return this.commentService.create(user.id, postId, commentDto.text);
  }

  @Delete(':id')
  @UseGuards(JwtRefreshGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commentService.delete(id);
  }

  @Put(':id')
  @UseGuards(JwtRefreshGuard)
  async update(
    @Param('id') commentId: string,
    @Body() commentDto: CommentDto,
  ): Promise<Comment> {
    return this.commentService.update(commentId, commentDto.text);
  }
}
