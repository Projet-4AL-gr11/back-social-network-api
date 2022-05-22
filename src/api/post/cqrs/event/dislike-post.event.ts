export class DislikePostEvent {
  constructor(public readonly userId: string, public readonly postId: string) {}
}
