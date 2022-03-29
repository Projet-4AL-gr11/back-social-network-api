export class UpdateCommentCommand {
  constructor(
    public readonly commentId: string,
    public readonly text: string,
  ) {}
}
