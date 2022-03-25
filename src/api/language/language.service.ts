import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Language } from './domain/entities/language.entity';
import { GetLanguageQuery } from './cqrs/query/get-language.query';
import { LanguageDto } from './domain/dto/language.dto';
import { CreateLanguageCommand } from './cqrs/command/create-language.command';
import { DeleteLanguageCommand } from './cqrs/command/delete-language.command';
import { UpdateLanguageCommand } from './cqrs/command/update-language.command';

@Injectable()
export class LanguageService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async getOne(id: string): Promise<Language> {
    return await this.queryBus.execute(new GetLanguageQuery(id));
  }

  async getAll(): Promise<Language[]> {
    return await this.queryBus.execute(new GetLanguageQuery());
  }

  async create(languageDto: LanguageDto): Promise<Language> {
    return await this.commandBus.execute(
      new CreateLanguageCommand(languageDto),
    );
  }

  async delete(id: string): Promise<void> {
    return await this.commandBus.execute(new DeleteLanguageCommand(id));
  }

  async update(id: string, languageDto: LanguageDto): Promise<Language> {
    await this.commandBus.execute(new UpdateLanguageCommand(id, languageDto));
    return this.queryBus.execute(new GetLanguageQuery(id));
  }
}
