import { IsNotEmpty } from "class-validator";

export class ExecuteDto {

  id?: number;
  execution_id?: number;

  @IsNotEmpty()
  language: string;
  @IsNotEmpty()
  code: string;

  code_result?: string;
  result?: string;
}
