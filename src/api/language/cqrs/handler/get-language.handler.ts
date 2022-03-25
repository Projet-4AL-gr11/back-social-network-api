import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLanguageQuery } from '../query/get-language.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../../domain/entities/language.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetLanguageQuery)
export class GetLanguageHandler implements IQueryHandler<GetLanguageQuery> {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  execute(query: GetLanguageQuery): Promise<any> {
    if (query.id) {
      return this.languageRepository.findOne(query.id);
    }
    return this.languageRepository.find();
  }
}
