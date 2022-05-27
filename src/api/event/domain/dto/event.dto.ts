import { User } from '../../../user/domain/entities/user.entity';
import { Group } from '../../../group/domain/entities/group.entity';
import { Language } from '../../../language/domain/entities/language.entity';

export class EventDto {
  constructor(
    public readonly name?: string,
    public readonly description?: string,
    public readonly startDate?: Date,
    public readonly endDate?: Date,
    public readonly participationLimit?: number,
    public user?: User,
    public readonly group?: Group,
    public readonly language?: Language,
  ) {}
}
