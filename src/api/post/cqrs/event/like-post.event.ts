export class LikePostEvent {
  constructor(public readonly userId: string, public readonly postId: string) {}
}
