import { Language } from '../../../language/domain/entities/language.entity';

export class UpdateExerciseTemplateCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly language: Language,
    public readonly code: string,
  ) {}
}
