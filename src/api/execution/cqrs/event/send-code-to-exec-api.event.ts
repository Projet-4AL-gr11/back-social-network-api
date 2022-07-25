import { ExecuteDto } from '../../domain/dto/execute.dto';

export class SendCodeToExecApiEvent {
  constructor(public readonly executeDto: ExecuteDto) {}
}
