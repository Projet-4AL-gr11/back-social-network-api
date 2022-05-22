export class CreateReportUserEvent {
  constructor(
    public readonly userId: string,
    public readonly reportId: string,
    public readonly id: string,
  ) {}
}
