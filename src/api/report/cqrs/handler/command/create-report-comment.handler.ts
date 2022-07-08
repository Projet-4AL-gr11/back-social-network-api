import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateReportCommentCommand } from '../../command/create-report-comment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../domain/entities/report.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateReportCommentEvent } from '../../event/create-report-comment.event';

@CommandHandler(CreateReportCommentCommand)
export class CreateReportCommentHandler
  implements ICommandHandler<CreateReportCommentCommand>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateReportCommentCommand): Promise<Report> {
    try {
      const report = await this.reportRepository.create({
        userReporter: command.creator,
        text: command.text,
        reportedComment: command.comment,
      });
      const newReport = await this.reportRepository.save(report);
      this.eventBus.publish(
        new CreateReportCommentEvent(
          command.creator.id,
          newReport.id,
          command.comment.id,
        ),
      );
      return newReport;
    } catch (error) {
      // TODO: Renvouyer une vrai erreur
      this.eventBus.publish(
        new ErrorsEvent('CreateReportCommentHandler', error),
      );
      throw error;
    }
  }
}
