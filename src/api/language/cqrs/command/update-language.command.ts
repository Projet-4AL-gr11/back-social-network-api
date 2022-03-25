import { LanguageDto } from '../../domain/dto/language.dto';

export class UpdateLanguageCommand {
  constructor(
    public readonly id: string,
    public readonly languageDto: LanguageDto,
  ) {}
}
