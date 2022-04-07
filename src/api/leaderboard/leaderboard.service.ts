import {Injectable} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateLeaderboardDto} from "./domain/dto/create-leaderboard.dto";
import {Leaderboard} from "./domain/entities/leaderboard.entity";
import {GetUserQuery} from "../user/cqrs/query/get-user.query";
import {CreateLeaderboardCommand} from "./cqrs/command/create-leaderboard.command";
import {DeleteLeaderboardCommand} from "./cqrs/command/delete-leaderboard.command";
import {GetLeaderboardByIdQuery} from "./cqrs/query/get-leaderboard-by-id.query";
import {GetLeaderboardForExerciseQuery} from "./cqrs/query/get-leaderboard-for-exercise.query";
import {GetLeaderboardForUserQuery} from "./cqrs/query/get-leaderboard-for-user.query";
import {GetExerciseQuery} from "../exercices/cqrs/query/get-exercise.query";
import {UpdateLeaderboardExerciseRankingCommand} from "./cqrs/command/update-leaderboard-exercise-ranking.command";
import {GetLeaderboardForUserWithExerciseIdQuery} from "./cqrs/query/get-leaderboard-for-user-with-exercise-id.query";
import {Event} from "../event/domain/entities/event.entity";
import {GetEventQuery} from "../event/cqrs/query/get-event.query";
import {UpdateEventRankingCommand} from "./cqrs/command/update-event-ranking.command";

@Injectable()
export class LeaderboardService {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {
    }

    async createLeaderboard(createLeaderBoardDto: CreateLeaderboardDto): Promise<Leaderboard> {
        const user = await this.queryBus.execute(new GetUserQuery(createLeaderBoardDto.userId));
        const exercise = await this.queryBus.execute(new GetExerciseQuery(createLeaderBoardDto.exerciseId))
        return await this.commandBus.execute(new CreateLeaderboardCommand(user, createLeaderBoardDto.userEntry, exercise))
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
        return await this.queryBus.execute(new GetLeaderboardForUserQuery(id))
    }

    async getLeaderboardForUserWithExerciseId(userId: string, exerciseId: string): Promise<Leaderboard> {
        return await this.queryBus.execute(new GetLeaderboardForUserWithExerciseIdQuery(userId, exerciseId));
    }

    async updateLeaderBoardRanking( exerciseId: string): Promise<Leaderboard[]> {
        const leaderboards: Leaderboard[] = await this.getLeaderboardForExercise(exerciseId);
        await this.commandBus.execute(new UpdateLeaderboardExerciseRankingCommand( exerciseId, leaderboards));
        return await this.getLeaderboardForExercise(exerciseId);
    }

    async updateEventRanking(eventId: string): Promise<void> {
        const allLeaderboard: Map<number, Leaderboard[]> = new Map();
        const event: Event = await this.queryBus.execute(new GetEventQuery(eventId));
        for (let i=0; i < event.exercises.length; i++){
            allLeaderboard.set(i, await this.updateLeaderBoardRanking(event.exercises[i].id));
        }

        await this.commandBus.execute(new UpdateEventRankingCommand(event,event.participants, allLeaderboard))
    }
}
