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
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';

@Controller('post')
export class PostController {
  // TODO: Ajouter les UseGpageuards
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

  @Get('is-liked/:id')
  @UseGuards(JwtRefreshGuard)
  isLiked(@Param('id') postId: string, @Req() request: RequestUser) {
    const { user } = request;
    return this.postService.isLiked(user.id, postId);
  }

  @Get('is-post-owner/:id')
  @UseGuards(JwtRefreshGuard)
  isPostOwner(@Param('id') postId: string, @Req() request: RequestUser) {
    const { user } = request;
    return this.postService.isPostOwner(user.id, postId);
  }

  @Get('getSharedPost/:id')
  getSharedPost(@Param('id') id: string) {
    return this.postService.getSharedPost(id);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('getTimeline/:offset/:limit')
  getTimeline(
    @Req() request: RequestUser,
    @Param('offset') offset: string,
    @Param('limit') limit: string,
  ) {
    const { user } = request;
    return this.postService.getTimeLine(user.id, Number(offset), Number(limit));
  }

  @UseGuards(JwtRefreshGuard)
  @Get('group/:groupId/:offset/:limit')
  getGroupPost(
    @Param('groupId') groupId: string,
    @Param('offset') offset: string,
    @Param('limit') limit: string,
  ) {
    return this.postService.getPostWithGroupId(
      groupId,
      Number(offset),
      Number(limit),
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Get('getUserPost/:userId/:offset/:limit')
  getUserPost(
    @Param('userId') userId: string,
    @Param('offset') offset: string,
    @Param('limit') limit: string,
  ) {
    return this.postService.getUserPosts(userId, Number(offset), Number(limit));
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/')
  createPost(@Req() request: RequestUser, @Body() postDto: PostDto) {
    const { user } = request;
    return this.postService.createPost(user.id, postDto);
  }

  @Post('forGroup/:groupId')
  @UseGuards(JwtRefreshGuard)
  createPostForGroup(
    @Req() request: RequestUser,
    @Param('groupId') groupId: string,
    @Body() postDto: PostDto,
  ) {
    const { user } = request;
    return this.postService.createPost(user.id, postDto, groupId);
  }

  @Post('like/:id')
  @UseGuards(JwtRefreshGuard)
  likePost(@Req() request: RequestUser, @Param('id') postId: string) {
    const { user } = request;
    return this.postService.likePost(user.id, postId);
  }

  @Post('dislike/:id')
  @UseGuards(JwtRefreshGuard)
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
