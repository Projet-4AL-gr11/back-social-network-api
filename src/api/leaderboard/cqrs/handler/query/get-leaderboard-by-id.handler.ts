import { IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetLeaderboardByIdQuery} from "../../query/get-leaderboard-by-id.query";
import {InjectRepository} from "@nestjs/typeorm";
import {Leaderboard} from "../../../domain/entities/leaderboard.entity";
import {Repository} from "typeorm";

@QueryHandler(GetLeaderboardByIdQuery)
export class GetLeaderboardByIdHandler implements IQueryHandler<GetLeaderboardByIdQuery> {

    constructor(
        @InjectRepository(Leaderboard)
        private leaderboardRepository: Repository<Leaderboard>,
    ) {}

    async execute(query: GetLeaderboardByIdQuery): Promise<Leaderboard> {
        return await this.leaderboardRepository.findOne(query.id);
    }
}
