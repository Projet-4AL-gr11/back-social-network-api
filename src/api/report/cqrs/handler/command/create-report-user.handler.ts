import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../domain/entities/report.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateReportUserCommand } from '../../command/create-report-user.command';
import { CreateReportUserEvent } from '../../event/create-report-user.event';

@CommandHandler(CreateReportUserCommand)
export class CreateReportUserHandler
  implements ICommandHandler<CreateReportUserCommand>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateReportUserCommand): Promise<Report> {
    try {
      const report = await this.reportRepository.create({
        userReporter: command.creator,
        text: command.text,
        reportedUser: command.user,
      });
      const newReport = await this.reportRepository.save(report);
      this.eventBus.publish(
        new CreateReportUserEvent(
          command.creator.id,
          newReport.id,
          command.user.id,
        ),
      );
      return newReport;
    } catch (error) {
      // TODO: Renvouyer une vrai erreur
      this.eventBus.publish(new ErrorsEvent('CreateReportUserHandler', error));
      throw error;
    }
  }
}
