import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateLeaderboardDto } from './domain/dto/create-leaderboard.dto';
import { Leaderboard } from './domain/entities/leaderboard.entity';
import { GetUserQuery } from '../user/cqrs/query/get-user.query';
import { CreateLeaderboardCommand } from './cqrs/command/create-leaderboard.command';
import { DeleteLeaderboardCommand } from './cqrs/command/delete-leaderboard.command';
import { GetLeaderboardByIdQuery } from './cqrs/query/get-leaderboard-by-id.query';
import { GetLeaderboardForExerciseQuery } from './cqrs/query/get-leaderboard-for-exercise.query';
import { GetLeaderboardForUserQuery } from './cqrs/query/get-leaderboard-for-user.query';
import { GetExerciseQuery } from '../exercices/cqrs/query/get-exercise.query';
import { UpdateLeaderboardExerciseRankingCommand } from './cqrs/command/update-leaderboard-exercise-ranking.command';
import { GetLeaderboardForUserWithExerciseIdQuery } from './cqrs/query/get-leaderboard-for-user-with-exercise-id.query';
import { Event } from '../event/domain/entities/event.entity';
import { GetEventQuery } from '../event/cqrs/query/get-event.query';
import { UpdateEventRankingCommand } from './cqrs/command/update-event-ranking.command';
import { GetEventRankingQuery } from './cqrs/query/get-event-ranking.query';
import { GetLeaderboardWithOrderQuery } from './cqrs/query/get-leaderboard-with-order.query';
import { ExecuteRequestDto } from './domain/dto/execute-request.dto';
import { ExecuteDto } from './domain/dto/execute.dto';
import { ExerciseTemplate } from '../exercices/domain/entities/exercise-template.entity';
import { GetExerciseTemplateWithExerciseIdQuery } from '../exercices/cqrs/query/get-exercise-template-with-exercise-id.query';
import { ExecPatternEnum } from './domain/enum/exec-pattern.enum';
import { ExecuteResultDto } from './domain/dto/execute-result.dto';
import { SendCodeToExecApiCommand } from './cqrs/command/send-code-to-exec-api.command';
import { ExecuteResponseDto } from './domain/dto/execute-response.dto';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SaveExecutionFileCommand } from './cqrs/command/save-execution-file.command';
import { ExecutionFileDto } from './domain/dto/execution-file.dto';
import { GetLeaderboardForUserWithExerciseIdHandler } from './cqrs/handler/query/get-leaderboard-for-user-with-exercise-id.handler';

@Injectable()
export class ExecutionService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async createLeaderboard(
    createLeaderBoardDto: CreateLeaderboardDto,
  ): Promise<Leaderboard> {
    const user = await this.queryBus.execute(
      new GetUserQuery(createLeaderBoardDto.userId),
    );
    const exercise = await this.queryBus.execute(
      new GetExerciseQuery(createLeaderBoardDto.exerciseId),
    );
    return await this.commandBus.execute(
      new CreateLeaderboardCommand(
        user,
        createLeaderBoardDto.userEntry,
        exercise,
        createLeaderBoardDto.timerScore,
        createLeaderBoardDto.executionId,
      ),
    );
  }

  async deleteLeaderboard(id: string): Promise<void> {
    return await this.commandBus.execute(new DeleteLeaderboardCommand(id));
  }

  async getById(id: string): Promise<Leaderboard> {
    return await this.queryBus.execute(new GetLeaderboardByIdQuery(id));
  }

  async getLeaderboardForExercise(id: string): Promise<Leaderboard[]> {
    return await this.queryBus.execute(new GetLeaderboardForExerciseQuery(id));
  }

  async getLeaderboardForUser(id: string): Promise<Leaderboard[]> {
    return await this.queryBus.execute(new GetLeaderboardForUserQuery(id));
  }

  async getLeaderboardForUserWithExerciseId(
    userId: string,
    exerciseId: string,
  ): Promise<Leaderboard> {
    return await this.queryBus.execute(
      new GetLeaderboardForUserWithExerciseIdQuery(userId, exerciseId),
    );
  }

  async updateLeaderBoardRanking(exerciseId: string): Promise<Leaderboard[]> {
    const leaderboards: Leaderboard[] =
      await this.getLeaderboardForExerciseWithOrder(exerciseId);
    if (leaderboards.length > 0) {
      await this.commandBus.execute(
        new UpdateLeaderboardExerciseRankingCommand(exerciseId, leaderboards),
      );
    }
    return await this.getLeaderboardForExercise(exerciseId);
  }

  async updateEventRanking(eventId: string): Promise<void> {
    const allLeaderboard: Map<number, Leaderboard[]> = new Map();
    const event: Event = await this.queryBus.execute(
      new GetEventQuery(eventId),
    );
    for (let i = 0; i < event.exercises.length; i++) {
      allLeaderboard.set(
        i,
        await this.updateLeaderBoardRanking(event.exercises[i].id),
      );
    }

    await this.commandBus.execute(
      new UpdateEventRankingCommand(event, event.participants, allLeaderboard),
    );
  }

  async getEventRanking(id: string) {
    return this.queryBus.execute(new GetEventRankingQuery(id));
  }

  private async getLeaderboardForExerciseWithOrder(exerciseId: string) {
    return await this.queryBus.execute(
      new GetLeaderboardWithOrderQuery(exerciseId),
    );
  }

  async execCode(executeRequestDto: ExecuteRequestDto) {
    if (
      (await this.queryBus.execute(
        new GetLeaderboardForUserWithExerciseIdQuery(
          executeRequestDto.exerciseId,
          executeRequestDto.user.id,
        ),
      )) != null
    ) {
      const execDto: ExecuteDto = new ExecuteDto();
      const exerciseTemplate: ExerciseTemplate = await this.queryBus.execute(
        new GetExerciseTemplateWithExerciseIdQuery(
          executeRequestDto.exerciseId,
        ),
      );
      execDto.execution_id = Number(Date.now());
      execDto.code = exerciseTemplate.code.replace(
        ExecPatternEnum.EXEC_CODE,
        executeRequestDto.code,
      );
      execDto.language = executeRequestDto.language;
      execDto.userId = executeRequestDto.user.id;

      const execResponse: ExecuteResultDto = await this.commandBus.execute(
        new SendCodeToExecApiCommand(execDto),
      );
      if (execResponse.error != null) {
        return new ExecuteResponseDto(execResponse.error, false);
      } else if (execResponse.result.result == 'EverythingIsGood\n') {
        const createLeaderboardDto = new CreateLeaderboardDto(
          executeRequestDto.user.id,
          executeRequestDto.code,
          executeRequestDto.exerciseId,
          executeRequestDto.timerScore,
          execDto.execution_id,
        );
        const newLeaderBoard: Leaderboard = await this.createLeaderboard(
          createLeaderboardDto,
        ).then(async (leaderboard) => {
          await this.updateEventRanking(
            await this.queryBus
              .execute(new GetExerciseQuery(executeRequestDto.exerciseId))
              .then((exercise) => {
                return exercise.event.id;
              }),
          );
          return leaderboard;
        });
        await this.commandBus.execute(
          new SaveExecutionFileCommand(
            new ExecutionFileDto(
              Buffer.from(executeRequestDto.code),
              newLeaderBoard.id,
              String(execDto.execution_id),
            ),
          ),
        );
        return new ExecuteResponseDto(execResponse.result.result, true);
      } else {
        return new ExecuteResponseDto(execResponse.result.result, false);
      }
    } else {
      return "Error: Vous avez déjà participé a l'exercise";
    }
  }

  async findAllExec() {
    let response;

    try {
      response = await Axios.get(process.env.EXEC_CODE_URL + '/api/code').then(
        function (response) {
          return response.data;
        },
      );
    } catch (er) {
      console.log(er);
    }
    return await response;
  }
}
