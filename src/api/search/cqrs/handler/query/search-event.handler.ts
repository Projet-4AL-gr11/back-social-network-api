import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchEventQuery } from '../../query/search-event.query';
import { Event } from '../../../../event/domain/entities/event.entity';

@QueryHandler(SearchEventQuery)
export class SearchEventHandler implements IQueryHandler<SearchEventQuery> {
  private levenshteinTresHold = Number(process.env.LEVENSHTEIN_SCORE_THRESHOLD);

  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async execute(query: SearchEventQuery) {
    const eventList = [];

    await this.eventRepository.find().then((events) => {
      events.forEach((event) => {
        if (
          this.levenshtein(event.name, query.userEntry) <=
          this.levenshteinTresHold
        ) {
          eventList.push(event);
        }
      });
    });

    return eventList;
  }

  levenshtein(a: string, b: string): number {
    const an = a ? a.length : 0;
    const bn = b ? b.length : 0;
    if (an === 0) {
      return bn;
    }
    if (bn === 0) {
      return an;
    }
    const matrix = new Array<number[]>(bn + 1);
    for (let i = 0; i <= bn; ++i) {
      const row = (matrix[i] = new Array<number>(an + 1));
      row[0] = i;
    }
    const firstRow = matrix[0];
    for (let j = 1; j <= an; ++j) {
      firstRow[j] = j;
    }
    for (let i = 1; i <= bn; ++i) {
      for (let j = 1; j <= an; ++j) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] =
            Math.min(
              matrix[i - 1][j - 1], // substitution
              matrix[i][j - 1], // insertion
              matrix[i - 1][j], // deletion
            ) + 1;
        }
      }
    }
    return matrix[bn][an];
  }
}
