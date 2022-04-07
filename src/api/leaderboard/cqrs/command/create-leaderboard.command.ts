import {User} from "../../../user/domain/entities/user.entity";
import {Exercise} from "../../../exercices/domain/entities/exercise.entity";

export class CreateLeaderboardCommand {
    constructor(
        public readonly user: User,
        public readonly userEntry: string,
        public readonly exercise: Exercise,
    ) {
    }
}
