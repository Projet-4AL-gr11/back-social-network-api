import { ReturnOfExecApiDto } from './return-of-exec-api.dto';

export class ExecuteResultDto {
  constructor(public error: string, public result?: ReturnOfExecApiDto) {}
}
