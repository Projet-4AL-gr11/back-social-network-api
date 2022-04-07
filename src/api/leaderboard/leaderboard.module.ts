import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/domain/entities/user.entity";
import {CqrsModule} from "@nestjs/cqrs";
import {Leaderboard} from "./domain/entities/leaderboard.entity";
import {EventRanking} from "./domain/entities/event-ranking.entity";
import {Event} from "../event/domain/entities/event.entity";
import {LeaderboardController} from "./leaderboard.controller";
import {LeaderboardService} from "./leaderboard.service";
import {CreateLeaderboardHandler} from "./cqrs/handler/command/create-leaderboard.handler";
import {DeleteLeaderboardHandler} from "./cqrs/handler/command/delete-leaderboard.handler";
import {UpdateEventRankingHandler} from "./cqrs/handler/command/update-event-ranking.handler";
import {
    UpdateLeaderboardExerciseRankingHandler
} from "./cqrs/handler/command/update-leaderboard-exercise-ranking.handler";
import {
    GetLeaderboardForUserWithExerciseIdHandler
} from "./cqrs/handler/query/get-leaderboard-for-user-with-exercise-id.handler";
import {GetLeaderboardByIdHandler} from "./cqrs/handler/query/get-leaderboard-by-id.handler";
import {GetLeaderboardForExerciseHandler} from "./cqrs/handler/query/get-leaderboard-for-exercise.handler";
import {GetLeaderboardForUserHandler} from "./cqrs/handler/query/get-leaderboard-for-user.handler";

@Module({
    imports: [TypeOrmModule.forFeature([User, Leaderboard, EventRanking, Event]), CqrsModule],
    controllers: [LeaderboardController],
    providers: [
        LeaderboardService,
        CreateLeaderboardHandler,
        DeleteLeaderboardHandler,
        UpdateEventRankingHandler,
        UpdateLeaderboardExerciseRankingHandler,
        GetLeaderboardForUserWithExerciseIdHandler,
        GetLeaderboardForExerciseHandler,
        GetLeaderboardByIdHandler,
        GetLeaderboardForUserHandler,
    ],
})
export class UserModule {}
