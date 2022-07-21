import { ExecutionFileDto } from '../../domain/dto/execution-file.dto';

export class SaveExecutionFileEvent {
  constructor(public readonly executionFileDto: ExecutionFileDto) {}
}
