import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchUserQuery } from '../../query/search-user.query';
import { User } from '../../../../user/domain/entities/user.entity';

@QueryHandler(SearchUserQuery)
export class SearchUserHandler implements IQueryHandler<SearchUserQuery> {
  private levenshteinTresHold = Number(process.env.LEVENSHTEIN_SCORE_THRESHOLD);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: SearchUserQuery) {
    const userList = [];

    await this.userRepository.find().then((users) => {
      users.forEach((user) => {
        if (
          this.levenshtein(user.username, query.userEntry) <=
          this.levenshteinTresHold
        ) {
          userList.push(user);
        }
      });
    });

    return userList;
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
