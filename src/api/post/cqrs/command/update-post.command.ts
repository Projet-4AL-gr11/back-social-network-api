import { PostDto } from '../../domain/dto/post.dto';

export class UpdatePostCommand {
  constructor(
    public readonly postId: string,
    public readonly postDto: PostDto,
  ) {}
}
