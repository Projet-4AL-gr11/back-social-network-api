import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './domain/entities/language.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { CreateLanguageHandler } from './cqrs/handler/create-language.handler';
import { DeleteLanguageHandler } from './cqrs/handler/delete-language.handler';
import { GetLanguageHandler } from './cqrs/handler/get-language.handler';
import { UpdateLanguageHandler } from './cqrs/handler/update-language.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Language]), CqrsModule],
  controllers: [LanguageController],
  providers: [
    LanguageService,
    CreateLanguageHandler,
    DeleteLanguageHandler,
    GetLanguageHandler,
    UpdateLanguageHandler,
  ],
})
export class LanguageModule {}
