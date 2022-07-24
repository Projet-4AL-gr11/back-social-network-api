import { User } from '../../../user/domain/entities/user.entity';
import { Exercise } from '../../../exercices/domain/entities/exercise.entity';

export class CreateReportExerciseCommand {
  constructor(
    public readonly creator: User,
    public readonly exercise: Exercise,
    public readonly text: string,
  ) {}
}
