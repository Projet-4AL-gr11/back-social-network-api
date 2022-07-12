import { PartialType } from '@nestjs/mapped-types';
import { CreateExecuteDto } from './create-execute.dto';

export class UpdateExecuteDto extends PartialType(CreateExecuteDto) {}
