import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../domain/entities/report.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateReportEventCommand } from '../../command/create-report-event.command';
import { CreateReportEventEvent } from '../../event/create-report-event.event';

@CommandHandler(CreateReportEventCommand)
export class CreateReportEventHandler
  implements ICommandHandler<CreateReportEventCommand>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateReportEventCommand): Promise<Report> {
    try {
      const report = await this.reportRepository.create({
        userReporter: command.creator,
        text: command.text,
        reportedEvent: command.event,
      });
      const newReport = await this.reportRepository.save(report);
      this.eventBus.publish(
        new CreateReportEventEvent(
          command.creator.id,
          newReport.id,
          command.event.id,
        ),
      );
      return newReport;
    } catch (error) {
      // TODO: Renvouyer une vrai erreur
      this.eventBus.publish(new ErrorsEvent('CreateReportEventHandler', error));
      throw error;
    }
  }
}
