import { IsNotEmpty } from 'class-validator';
import { User } from '../../../user/domain/entities/user.entity';

export class ExecuteDto {
  execution_id?: number;
  @IsNotEmpty()
  language: string;
  @IsNotEmpty()
  code: string;

  userId: string;
  exerciseId: string;
}
