import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "../../../domain/entities/group.entity";
import { Repository } from "typeorm";
import { ErrorsEvent } from "../../../../../util/error/errorsEvent";
import { RemoveGroupFollowerCommand } from "../../command/remove-group-follower.command";
import { RemoveGroupFollowerEvent } from "../../event/remove-group-follower.event";

@CommandHandler(RemoveGroupFollowerCommand)
export class RemoveGroupFollowerHandler
  implements ICommandHandler<RemoveGroupFollowerCommand>
{
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private eventBus: EventBus,
  ) {}

  async execute(command: RemoveGroupFollowerCommand): Promise<void> {
    try {
      await this.groupRepository
        .createQueryBuilder()
        .relation('followers')
        .of(command.groupId)
        .remove(command.userId);
      this.eventBus.publish(
        new RemoveGroupFollowerEvent(command.userId, command.groupId),
      );
    } catch (error) {
      // TODO: return a vrai erreur
      this.eventBus.publish(new ErrorsEvent('RemoveGroupFollowerHandler', error));
      throw error;
    }
  }
}
