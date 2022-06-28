import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SearchResponseDto } from './domain/dto/search-response.dto';
import { SearchUserQuery } from './cqrs/query/search-user.query';
import { SearchEventQuery } from './cqrs/query/search-event.query';
import { SearchGroupQuery } from './cqrs/query/search-group.query';

@Injectable()
export class SearchService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async getSearch(userEntry: string) {
    return new SearchResponseDto(
      await this.queryBus.execute(new SearchUserQuery(userEntry)),
      await this.queryBus.execute(new SearchEventQuery(userEntry)),
      await this.queryBus.execute(new SearchGroupQuery(userEntry)),
    );
  }
}
