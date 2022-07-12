import { Injectable } from '@nestjs/common';
import { CreateExecuteDto } from './domain/dto/create-execute.dto';
import { UpdateExecuteDto } from './domain/dto/update-execute.dto';

@Injectable()
export class ExecuteService {
  create(createExecuteDto: CreateExecuteDto) {
    return 'This action adds a new execute';
  }

  findAll() {
    return `This action returns all execute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} execute`;
  }

  update(id: number, updateExecuteDto: UpdateExecuteDto) {
    return `This action updates a #${id} execute`;
  }

  remove(id: number) {
    return `This action removes a #${id} execute`;
  }
}
