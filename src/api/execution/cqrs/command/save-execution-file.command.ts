import { ExecutionFileDto } from '../../domain/dto/execution-file.dto';

export class SaveExecutionFileCommand {
  constructor(public readonly executionFileDto: ExecutionFileDto) {}
}
