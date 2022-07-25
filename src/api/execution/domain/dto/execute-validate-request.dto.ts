import { User } from '../../../user/domain/entities/user.entity';

export class ExecuteValidateRequestDto {
  public executionId: number;
  constructor(public code: string, public language: string, public user: User) {
    this.executionId = -1;
  }
}
