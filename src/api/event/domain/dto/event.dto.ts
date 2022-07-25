import { User } from '../../../user/domain/entities/user.entity';
import { Group } from '../../../group/domain/entities/group.entity';
import { Language } from '../../../language/domain/entities/language.entity';
import { ExerciseTemplate } from '../../../exercices/domain/entities/exercise-template.entity';

export class EventDto {
  constructor(
    public readonly exerciseTemplates?: ExerciseTemplate[],
    public readonly name?: string,
    public readonly description?: string,
    public startDate?: Date,
    public endDate?: Date,
    public readonly participationLimit?: number,
    public user?: User,
    public languages?: Language[],
    public readonly group?: Group,
  ) {
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
  }
}
