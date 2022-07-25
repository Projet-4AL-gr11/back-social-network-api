import { IsNotEmpty } from 'class-validator';
import { User } from '../../../user/domain/entities/user.entity';

export class ExecuteRequestDto {
  execution_id?: number;
  @IsNotEmpty()
  language: string;
  languageId: string;
  @IsNotEmpty()
  code: string;
  exerciseId: string;
  timerScore: number;
  user: User; // Recuperate via la request AuthGuard
}
