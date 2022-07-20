import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExecuteService } from './execute.service';
import { ExecuteDto } from './domain/dto/execute.dto';

@Controller('execute')
export class ExecuteController {
  constructor(private readonly executeService: ExecuteService) {}

  @Post()
  create(@Body() createExecuteDto: ExecuteDto) {
    console.log(createExecuteDto);
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
  update(@Param('id') id: string, @Body() updateExecuteDto: ExecuteDto) {
    return this.executeService.update(+id, updateExecuteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.executeService.remove(+id);
  }
}
