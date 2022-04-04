import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../domain/entities/report.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { DeleteReportCommand } from '../../command/delete-report.command';
import { DeleteReportEvent } from '../../event/delete-report.event';

@CommandHandler(DeleteReportCommand)
export class DeleteReportHandler
  implements ICommandHandler<DeleteReportCommand>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private eventBus: EventBus,
  ) {}

  async execute(command: DeleteReportCommand): Promise<void> {
    try {
      await this.reportRepository.delete(command.reportId);
      this.eventBus.publish(new DeleteReportEvent(command.reportId));
    } catch (error) {
      // TODO: Renvouyer une vrai erreur
      this.eventBus.publish(new ErrorsEvent('DeleteReportHandler', error));
      throw error;
    }
  }
}
