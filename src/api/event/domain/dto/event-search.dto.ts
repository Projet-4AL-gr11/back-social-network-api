import { Group } from '../../../group/domain/entities/group.entity';
import { Language } from '../../../language/domain/entities/language.entity';

export class EventSearchDto {
  constructor(
    public readonly name?: string,
    public readonly startDate?: Date,
    public readonly endDate?: Date,
    public readonly group?: Group,
    public readonly language?: Language,
  ) {}
}
