export class IsPostOwnerQuery {
  constructor(public readonly postId: string, public readonly userId: string) {}
}
