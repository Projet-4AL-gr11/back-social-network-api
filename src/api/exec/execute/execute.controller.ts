import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExecuteService } from './execute.service';
import { CreateExecuteDto } from './domain/dto/create-execute.dto';
import { UpdateExecuteDto } from './domain/dto/update-execute.dto';

@Controller('execute')
export class ExecuteController {
  constructor(private readonly executeService: ExecuteService) {}

  @Post()
  create(@Body() createExecuteDto: CreateExecuteDto) {
    return this.executeService.create(createExecuteDto);
  }

  @Get()
  findAll() {
    return this.executeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.executeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExecuteDto: UpdateExecuteDto) {
    return this.executeService.update(+id, updateExecuteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.executeService.remove(+id);
  }
}
