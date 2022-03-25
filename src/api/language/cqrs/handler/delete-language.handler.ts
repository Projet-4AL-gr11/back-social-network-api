import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteLanguageCommand } from '../command/delete-language.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../../domain/entities/language.entity';
import { ErrorsEvent } from '../../../../util/error/errorsEvent';
import { DeleteLanguageEvent } from '../event/delete-language.event';

@CommandHandler(DeleteLanguageCommand)
export class DeleteLanguageHandler
  implements ICommandHandler<DeleteLanguageCommand>
{
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    private eventBus: EventBus,
  ) {}

  async execute(command: DeleteLanguageCommand): Promise<void> {
    try {
      await this.languageRepository.delete(command.id);
      this.eventBus.publish(new DeleteLanguageEvent(command.id));
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('DeleteLanguageHandler', error));
      throw error;
    }
  }
}
