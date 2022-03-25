import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLanguageCommand } from '../command/update-language.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../../domain/entities/language.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';
import { UpdateLanguageEvent } from '../event/update-language.event';

@CommandHandler(UpdateLanguageCommand)
export class UpdateLanguageHandler
  implements ICommandHandler<UpdateLanguageCommand>
{
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    private eventBus: EventBus,
  ) {}

  async execute(command: UpdateLanguageCommand): Promise<void> {
    try {
      await this.languageRepository.update(command.id, command.languageDto);
      this.eventBus.publish(new UpdateLanguageEvent(command.id));
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('UpdateLanguageHandler', error));
      throw error;
    }
  }
}
