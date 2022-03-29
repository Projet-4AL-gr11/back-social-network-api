export class CreatePostEvent {
  constructor(
    public readonly userId: string,
    public readonly postId: string,
    public readonly groupId?: string,
  ) {}
}
