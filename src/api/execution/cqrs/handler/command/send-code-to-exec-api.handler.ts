import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SendCodeToExecApiCommand } from '../../command/send-code-to-exec-api.command';
import Axios from 'axios';
import { SendCodeToExecApiEvent } from '../../event/send-code-to-exec-api.event';
import { ExecuteResultDto } from '../../../domain/dto/execute-result.dto';
import { SendCodeToExecApiResponseEvent } from '../../event/send-code-to-exec-api-response.event';

@CommandHandler(SendCodeToExecApiCommand)
export class SendCodeToExecApiHandler
  implements ICommandHandler<SendCodeToExecApiCommand>
{
  constructor(private eventBus: EventBus) {}

  async execute(command: SendCodeToExecApiCommand): Promise<ExecuteResultDto> {
    try {
      let response;
      let result;

      try {
        this.eventBus.publish(new SendCodeToExecApiEvent(command.execCodeDto));

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
        this.eventBus.publish(
          new SendCodeToExecApiResponseEvent(
            command.execCodeDto.userId,
            command.execCodeDto.execution_id,
          ),
        );
        return result;
      }

      result = {
        error: null,
        result: { ...response.data },
      };
      this.eventBus.publish(
        new SendCodeToExecApiResponseEvent(
          command.execCodeDto.userId,
          command.execCodeDto.execution_id,
        ),
      );
      return result;
    } catch (err) {
      return {
        error: 'Something went Wrong try again',
        result: null,
      };
    }
  }
}
