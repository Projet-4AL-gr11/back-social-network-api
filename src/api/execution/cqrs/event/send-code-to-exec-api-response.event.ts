export class SendCodeToExecApiResponseEvent {
  constructor(public readonly userId: string, public readonly result: number) {}
}
