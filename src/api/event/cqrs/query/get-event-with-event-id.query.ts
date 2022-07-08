export class GetEventWithEventIdQuery {
  constructor(
    public readonly groupId: string,
    public readonly offset,
    public readonly limit,
  ) {}
}
