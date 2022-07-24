import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get(':userEntry')
  searchEngine(@Param('userEntry') userEntry: string) {
    return this.searchService.getSearch(userEntry);
  }
}
