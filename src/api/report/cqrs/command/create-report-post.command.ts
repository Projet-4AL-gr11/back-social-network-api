import { User } from "../../../user/domain/entities/user.entity";
import { Post } from "../../../post/domain/entities/post.entity";

export class CreateReportPostCommand {
  constructor(
    public readonly creator: User,
    public readonly post: Post,
    public readonly text: string,
  ) {}
}
