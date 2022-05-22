import { Post } from '../../../post/domain/entities/post.entity';
import { User } from '../../../user/domain/entities/user.entity';

export class AddCommentCommand {
  constructor(
    public readonly post: Post,
    public readonly user: User,
    public readonly text: string,
  ) {}
}
