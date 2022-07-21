import { ExecuteDto } from '../../domain/dto/execute.dto';
import { ExecuteRequestDto } from "../../domain/dto/execute-request.dto";

export class SendCodeToExecApiEvent {
  constructor(public readonly executeDto: ExecuteDto) {}
}
