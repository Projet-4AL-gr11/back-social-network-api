import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { LanguageService } from './language.service';
import JwtRefreshGuard from '../auth/guards/jwt-refresh-token.guard';
import { LanguageDto } from './domain/dto/language.dto';

@Controller('language')
export class LanguageController {
  constructor(private languageService: LanguageService) {}

  @Get()
  async getAll() {
    return this.languageService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.languageService.getOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtRefreshGuard)
  async delete(@Param('id') id: string) {
    return this.languageService.delete(id);
  }

  @Put(':id')
  @UseGuards(JwtRefreshGuard)
  async update(@Param('id') id: string, languageDto: LanguageDto) {
    return this.languageService.update(id, languageDto);
  }

  @Post()
  @UseGuards(JwtRefreshGuard)
  async create(@Body() languageDto: LanguageDto) {
    return this.languageService.create(languageDto);
  }
}
