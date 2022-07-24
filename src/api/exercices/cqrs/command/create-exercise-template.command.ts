import { Language } from '../../../language/domain/entities/language.entity';

export class CreateExerciseTemplateCommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly language: Language,
    public readonly code: string,
  ) {}
}
