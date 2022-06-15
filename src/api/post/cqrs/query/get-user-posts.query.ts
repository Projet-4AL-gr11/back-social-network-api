export class GetUserPostsQuery {
  constructor(
    public readonly userId,
    public readonly offset,
    public readonly limit,
  ) {}
}
