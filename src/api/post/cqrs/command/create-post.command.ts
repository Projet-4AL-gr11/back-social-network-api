import { PostDto } from '../../domain/dto/post.dto';
import { User } from '../../../user/domain/entities/user.entity';
import { Group } from '../../../group/domain/entities/group.entity';

export class CreatePostCommand {
  constructor(
    public readonly user: User,
    public readonly postDto: PostDto,
    public readonly group?: Group,
  ) {}
}
