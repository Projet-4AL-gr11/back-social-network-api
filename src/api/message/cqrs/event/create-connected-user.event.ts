export class CreateConnectedUserEvent {
  constructor(
    public readonly userId: string,
    public readonly socketId: string,
  ) {}
}
