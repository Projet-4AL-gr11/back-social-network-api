import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './domain/entities/language.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { CreateLanguageHandler } from './cqrs/handler/command/create-language.handler';
import { DeleteLanguageHandler } from './cqrs/handler/command/delete-language.handler';
import { GetLanguageHandler } from './cqrs/handler/query/get-language.handler';
import { UpdateLanguageHandler } from './cqrs/handler/command/update-language.handler';
import { CreateLanguageEventHandler } from "./cqrs/event-handler/create-language.event-handler";
import { DeleteLanguageEventHandler } from "./cqrs/event-handler/delete-language.event-handler";
import { UpdateLanguageEventHandler } from "./cqrs/event-handler/update-language.event-handler";

@Module({
  imports: [TypeOrmModule.forFeature([Language]), CqrsModule],
  controllers: [LanguageController],
  providers: [
    LanguageService,
    CreateLanguageHandler,
    DeleteLanguageHandler,
    GetLanguageHandler,
    UpdateLanguageHandler,
    CreateLanguageEventHandler,
    DeleteLanguageEventHandler,
    UpdateLanguageEventHandler
  ],
})
export class LanguageModule {}
