import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/domain/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { Leaderboard } from './domain/entities/leaderboard.entity';
import { EventRanking } from './domain/entities/event-ranking.entity';
import { Event } from '../event/domain/entities/event.entity';
import { ExecutionService } from './execution.service';
import { CreateLeaderboardHandler } from './cqrs/handler/command/create-leaderboard.handler';
import { DeleteLeaderboardHandler } from './cqrs/handler/command/delete-leaderboard.handler';
import { UpdateEventRankingHandler } from './cqrs/handler/command/update-event-ranking.handler';
import { UpdateLeaderboardExerciseRankingHandler } from './cqrs/handler/command/update-leaderboard-exercise-ranking.handler';
import { GetLeaderboardForUserWithExerciseIdHandler } from './cqrs/handler/query/get-leaderboard-for-user-with-exercise-id.handler';
import { GetLeaderboardByIdHandler } from './cqrs/handler/query/get-leaderboard-by-id.handler';
import { GetLeaderboardForExerciseHandler } from './cqrs/handler/query/get-leaderboard-for-exercise.handler';
import { GetLeaderboardForUserHandler } from './cqrs/handler/query/get-leaderboard-for-user.handler';
import { GetEventRankingHandler } from './cqrs/handler/query/get-event-ranking.handler';
import { CreateLeaderboardEventHandler } from './cqrs/event-handler/create-leaderboard.event-handler';
import { DeleteLeaderboardEventHandler } from './cqrs/event-handler/delete-leaderboard.event-handler';
import { UpdateEventRankingEventHandler } from './cqrs/event-handler/update-event-ranking.event-handler';
import { UpdateLeaderboardExerciseRankingEventHandler } from './cqrs/event-handler/update-leaderboard-exercise-ranking.event-handler';
import { ErrorEventHandler } from '../../util/error/error.event-handler';
import { SendCodeToExecApiHandler } from './cqrs/handler/command/send-code-to-exec-api.handler';
import { SendCodeToExecApiEventHandler } from './cqrs/event-handler/send-code-to-exec-api.event-handler';
import { ExerciseTemplate } from '../exercices/domain/entities/exercise-template.entity';
import { Exercise } from '../exercices/domain/entities/exercise.entity';
import { ExecutionFile } from './domain/entities/execution-file.entity';
import { SaveExecutionFileHandler } from './cqrs/handler/command/save-execution-file.handler';
import { SaveExecutionFileEventHandler } from './cqrs/event-handler/save-execution-file.event-handler';
import { ExecutionController } from './execution.controller';
import { GetLeaderboardWithOrderHandler } from './cqrs/handler/query/get-leaderboard-with-order.handler';
import { GetEventGroupOwnerHandler } from '../event/cqrs/handler/query/get-event-group-owner.handler';
import { SendCodeToExecApiResponseEventHandler } from './cqrs/event-handler/send-code-to-exec-api-response.event-handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Leaderboard,
      EventRanking,
      Event,
      ExerciseTemplate,
      Exercise,
      ExecutionFile,
    ]),
    CqrsModule,
  ],
  controllers: [ExecutionController],
  providers: [
    ExecutionService,
    CreateLeaderboardHandler,
    DeleteLeaderboardHandler,
    UpdateEventRankingHandler,
    UpdateLeaderboardExerciseRankingHandler,
    GetLeaderboardForUserWithExerciseIdHandler,
    GetLeaderboardForExerciseHandler,
    GetLeaderboardByIdHandler,
    GetLeaderboardForUserHandler,
    GetEventRankingHandler,
    CreateLeaderboardEventHandler,
    DeleteLeaderboardEventHandler,
    UpdateEventRankingEventHandler,
    UpdateLeaderboardExerciseRankingEventHandler,
    ErrorEventHandler,
    SendCodeToExecApiHandler,
    SendCodeToExecApiEventHandler,
    SaveExecutionFileHandler,
    SaveExecutionFileEventHandler,
    GetLeaderboardWithOrderHandler,
    GetEventGroupOwnerHandler,
    SendCodeToExecApiResponseEventHandler,
  ],
})
export class ExecutionModule {}
