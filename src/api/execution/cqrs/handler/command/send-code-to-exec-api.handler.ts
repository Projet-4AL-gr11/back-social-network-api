import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AddParticipantToEventCommand } from '../../../../event/cqrs/command/add-participant-to-event.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../../event/domain/entities/event.entity';
import { Repository } from 'typeorm';
import { AddParticipantToEventEvent } from '../../../../event/cqrs/event/add-participant-to-event.event';
import { ErrorsEvent } from '../../../../../util/error/errorsEvent';
import { SendCodeToExecApiCommand } from '../../command/send-code-to-exec-api.command';
import Axios from 'axios';
import { SendCodeToExecApiEvent } from "../../event/send-code-to-exec-api.event";
import { ExecuteResultDto } from "../../../domain/dto/execute-result.dto";
import { ReturnOfExecApiDto } from "../../../domain/dto/return-of-exec-api.dto";

@CommandHandler(SendCodeToExecApiCommand)
export class SendCodeToExecApiHandler
  implements ICommandHandler<SendCodeToExecApiCommand>
{
  constructor(private eventBus: EventBus) {}

  async execute(command: SendCodeToExecApiCommand): Promise<ExecuteResultDto> {
    try {
      let response;
      let result: ExecuteResultDto;

      try {
        response = await Axios.post(
          process.env.EXEC_CODE_URL + '/api/code/',
          command.execCodeDto,
        ).then(function (response) {
          return response;
        });
      } catch (er) {
        result = {
          error: er,
          result: null,
        };
        this.eventBus.publish(new SendCodeToExecApiEvent(command.execCodeDto));
        return result;
      }

      result = {
        error: null,
        result: { ...response.data },
      };
      this.eventBus.publish(new SendCodeToExecApiEvent(command.execCodeDto));
      return result;
    } catch (error) {
      this.eventBus.publish(new ErrorsEvent('SendCodeToExecApiHandler', error));
      throw error;
    }
  }
}
