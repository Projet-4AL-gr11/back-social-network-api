import { User } from "../../../user/domain/entities/user.entity";
import { Comment } from "../../../comment/domain/entities/comment.entity";

export class CreateReportCommentCommand {
  constructor(
    public readonly creator: User,
    public readonly comment: Comment,
    public readonly text: string,
  ) {}
}
