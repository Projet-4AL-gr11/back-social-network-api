import { IsNotEmpty } from 'class-validator';

export class ExecuteDto {
  execution_id?: number;
  @IsNotEmpty()
  language: string;
  @IsNotEmpty()
  code: string;

  userId: string;
  exerciseId: string;
}
