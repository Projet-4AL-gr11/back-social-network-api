import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateReportGroupCommand } from '../../command/create-report-group.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../domain/entities/report.entity';
import { Repository } from 'typeorm';
import { CreateReportGroupEvent } from '../../event/create-report-group.event';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateReportPostCommand } from '../../command/create-report-post.command';
import { CreateReportPostEvent } from '../../event/create-report-post.event';

@CommandHandler(CreateReportPostCommand)
export class CreateReportPostHandler
  implements ICommandHandler<CreateReportPostCommand>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateReportPostCommand): Promise<Report> {
    try {
      const report = await this.reportRepository.create({
        userReporter: command.creator,
        text: command.text,
        reportedPost: command.post,
      });
      const newReport = await this.reportRepository.save(report);
      this.eventBus.publish(
        new CreateReportPostEvent(
          command.creator.id,
          newReport.id,
          command.post.id,
        ),
      );
      return newReport;
    } catch (error) {
      // TODO: Renvouyer une vrai erreur
      this.eventBus.publish(new ErrorsEvent('CreateReportPostHandler', error));
      throw error;
    }
  }
}
