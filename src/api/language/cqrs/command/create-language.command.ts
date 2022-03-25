import { LanguageDto } from '../../domain/dto/language.dto';

export class CreateLanguageCommand {
  constructor(public readonly languageDto: LanguageDto) {}
}
