export class CreatePostEvent {
  constructor(public readonly userId: string, public postId: string) {}
}
