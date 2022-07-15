export class ExecuteDto {

  id?: number;
  execution_id: number;
  language: string;
  code: string;
  code_result?: string;
  result?: string;
}
