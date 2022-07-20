import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../domain/entities/report.entity';
import { Repository } from 'typeorm';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { CreateReportExerciseCommand } from '../../command/create-report-exercise.command';
import { CreateReportExerciseEvent } from '../../event/create-report-exercise.event';

@CommandHandler(CreateReportExerciseCommand)
export class CreateReportExerciseHandler
  implements ICommandHandler<CreateReportExerciseCommand>
{
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateReportExerciseCommand): Promise<Report> {
    try {
      const report = await this.reportRepository.create({
        userReporter: command.creator,
        text: command.text,
        reportedExercise: command.exercise,
      });
      const newReport = await this.reportRepository.save(report);
      this.eventBus.publish(
        new CreateReportExerciseEvent(
          command.creator.id,
          newReport.id,
          command.exercise.id,
        ),
      );
      return newReport;
    } catch (error) {
      // TODO: Renvouyer une vrai erreur
      this.eventBus.publish(
        new ErrorsEvent('CreateReportExerciseHandler', error),
      );
      throw error;
    }
  }
}
