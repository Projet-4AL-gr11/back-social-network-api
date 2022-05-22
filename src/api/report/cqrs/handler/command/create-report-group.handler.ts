import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateReportEventCommand } from '../../command/create-report-event.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../domain/entities/report.entity';
import { Repository } from 'typeorm';
import { CreateReportEventEvent } from '../../event/create-report-event.event';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateReportGroupCommand } from '../../command/create-report-group.command';
import { CreateReportGroupEvent } from '../../event/create-report-group.event';

@CommandHandler(CreateReportGroupCommand)
export class CreateReportGroupHandler
  implements ICommandHandler<CreateReportGroupCommand>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateReportGroupCommand): Promise<Report> {
    try {
      const report = await this.reportRepository.create({
        userReporter: command.creator,
        text: command.text,
        reportedGroup: command.group,
      });
      const newReport = await this.reportRepository.save(report);
      this.eventBus.publish(
        new CreateReportGroupEvent(
          command.creator.id,
          newReport.id,
          command.group.id,
        ),
      );
      return newReport;
    } catch (error) {
      // TODO: Renvouyer une vrai erreur
      this.eventBus.publish(new ErrorsEvent('CreateReportGroupHandler', error));
      throw error;
    }
  }
}
