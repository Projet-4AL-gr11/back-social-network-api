import { User } from "../../../user/domain/entities/user.entity";
import { Event } from "../../../event/domain/entities/event.entity";

export class CreateReportEventCommand {
  constructor(
    public readonly creator: User,
    public readonly event: Event,
    public readonly text: string,
  ) {}
}
