import { PostDto } from '../../domain/dto/post.dto';
import { User } from '../../../user/domain/entities/user.entity';

export class CreatePostCommand {
  constructor(public readonly user: User, public readonly postDto: PostDto) {}
}
