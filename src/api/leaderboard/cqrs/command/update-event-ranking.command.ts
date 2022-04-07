import {Leaderboard} from "../../domain/entities/leaderboard.entity";
import {User} from "../../../user/domain/entities/user.entity";
import {Event} from "../../../event/domain/entities/event.entity";

export class UpdateEventRankingCommand {
    constructor(public readonly event: Event, public readonly participants: User[], public readonly allLeaderboard: Map<number, Leaderboard[]>) {
    }
}
