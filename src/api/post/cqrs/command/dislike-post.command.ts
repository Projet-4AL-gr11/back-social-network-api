export class DislikePostCommand {
  constructor(public readonly postId: string, public readonly userId: string) {}
}
