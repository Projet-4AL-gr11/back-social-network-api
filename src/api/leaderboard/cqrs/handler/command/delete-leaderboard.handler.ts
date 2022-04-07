import {CommandHandler, EventBus, ICommandHandler} from "@nestjs/cqrs";
import {CreateLeaderboardCommand} from "../../command/create-leaderboard.command";
import {InjectRepository} from "@nestjs/typeorm";
import {Leaderboard} from "../../../domain/entities/leaderboard.entity";
import {Repository} from "typeorm";
import {validate} from "class-validator";
import {CreateLeaderboardEvent} from "../../event/create-leaderboard.event";
import {ErrorsEvent} from "../../../../../util/error/errorsEvent";
import {DeleteLeaderboardCommand} from "../../command/delete-leaderboard.command";
import {DeleteLeaderboardEvent} from "../../event/delete-leaderboard.event";

@CommandHandler(DeleteLeaderboardCommand)
export class DeleteLeaderboardHandler implements ICommandHandler<DeleteLeaderboardCommand> {

    constructor(
        @InjectRepository(Leaderboard)
        private leaderboardRepository: Repository<Leaderboard>,
        private eventBus: EventBus,
    ) {
    }

    async execute(command: DeleteLeaderboardCommand): Promise<void> {
        try {
            await this.leaderboardRepository.delete(command.id);
            this.eventBus.publish(new DeleteLeaderboardEvent(command.id));
        } catch (error) {
            // TODO: retourné une vrai erreur
            this.eventBus.publish(new ErrorsEvent('DeleteLeaderboardHandler', error));
            throw error;
        }
    }
}
