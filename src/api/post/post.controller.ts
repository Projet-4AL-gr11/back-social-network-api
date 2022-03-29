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
import { PostService } from './post.service';
import { RequestUser } from '../auth/interface/request-user.interface';
import { PostDto } from './domain/dto/post.dto';

@Controller('post')
export class PostController {
  // TODO: Ajouter les UseGuards
  constructor(private postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.getById(id);
  }

  @Get('like/:id')
  getLike(@Param('id') id: string) {
    return this.postService.getLikes(id);
  }

  @Get('isLiked/:id')
  isLiked(@Param('id') postId: string, @Req() request: RequestUser) {
    const { user } = request;
    return this.postService.isLiked(user.id, postId);
  }

  @Get('isPostOwner/:id')
  isPostOwner(@Param('id') postId: string, @Req() request: RequestUser) {
    const { user } = request;
    return this.postService.isPostOwner(user.id, postId);
  }

  @Get('getSharedPost/:id')
  getSharedPost(@Param('id') id: string) {
    return this.postService.getSharedPost(id);
  }

  @Get('getTimeline/:userId?=:offset&=:limit')
  getTimeline(
    @Param('userId') userId: string,
    @Param('offset') offset: string,
    @Param('limit') limit: string,
  ) {
    return this.postService.getTimeLine(userId, Number(offset), Number(limit));
  }

  @Post()
  createPost(@Req() request: RequestUser, @Body() postDto: PostDto) {
    const { user } = request;
    return this.postService.createPost(user.id, postDto);
  }

  @Post('like/:id')
  likePost(@Req() request: RequestUser, @Param('id') postId: string) {
    const { user } = request;
    return this.postService.likePost(user.id, postId);
  }

  @Post('dislike/:id')
  dislikePost(@Req() request: RequestUser, @Param('id') postId: string) {
    const { user } = request;
    return this.postService.dislikePost(user.id, postId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() postDto: PostDto) {
    return this.postService.update(id, postDto);
  }
}
