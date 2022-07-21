import { ExecuteDto } from '../../domain/dto/execute.dto';

export class SendCodeToExecApiCommand {
  constructor(public readonly execCodeDto: ExecuteDto) {}
}
