import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {Logger} from "@nestjs/common";
import {logger} from "../../../../util/config/winston-logger.config";
import {UpdateLeaderboardExerciseRankingEvent} from "../event/update-leaderboard-exercise-ranking.event";

@EventsHandler(UpdateLeaderboardExerciseRankingEvent)
export class UpdateLeaderboardExerciseRankingEventHandler implements IEventHandler<UpdateLeaderboardExerciseRankingEvent> {
    logger_console = new Logger('UpdateLeaderboardExerciseRankingEventHandler');

    handle(event: UpdateLeaderboardExerciseRankingEvent): any {
        logger.info(
            'Leaderboard ranking for exercise with id : ( '
            + event.exerciseId + ' ) have been update'
        );

        this.logger_console.log(
            'Leaderboard ranking for exercise with id : ( '
            + event.exerciseId + ' ) have been update'
        );
    }
}
