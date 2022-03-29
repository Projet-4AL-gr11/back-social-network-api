export class AddCommentEvent {
  constructor(
    public readonly postId: string,
    public readonly userId: string,
    public readonly commentId: string,
  ) {}
}
