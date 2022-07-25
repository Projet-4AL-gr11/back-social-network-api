import { ExecutionFile } from '../../domain/entities/execution-file.entity';

export class GetExecutionFileTemporaryLinkQuery {
  constructor(public readonly executionFile: ExecutionFile) {}
}
