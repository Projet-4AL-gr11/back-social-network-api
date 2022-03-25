import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateLanguageCommand } from '../../command/create-language.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../../../domain/entities/language.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { validate } from 'class-validator';
import { CreateLanguageEvent } from '../../event/create-language.event';

@CommandHandler(CreateLanguageCommand)
export class CreateLanguageHandler
  implements ICommandHandler<CreateLanguageCommand>
{
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateLanguageCommand): Promise<Language> {
    try {
      const language = this.languageRepository.create({
        ...command.languageDto,
      });
      const err = await validate(language);
      if (err.length > 0) {
        throw err;
      }
      this.eventBus.publish(new CreateLanguageEvent(command.languageDto.name));
      return this.languageRepository.save(language);
    } catch (error) {
      // TODO: créer une vrai erreur
      this.eventBus.publish(new ErrorsEvent('CreateLanguageHandler', error));
      throw error;
    }
  }
}
