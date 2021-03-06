import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/domain/entities/user.entity';
import { Event } from '../event/domain/entities/event.entity';
import { Group } from '../group/domain/entities/group.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SearchEventHandler } from './cqrs/handler/query/search-event.handler';
import { SearchGroupHandler } from './cqrs/handler/query/search-group.handler';
import { SearchUserHandler } from './cqrs/handler/query/search-user.handler';
import { Post } from '../post/domain/entities/post.entity';
import { SearchPostHandler } from './cqrs/handler/query/search-post.handler';
import { ErrorEventHandler } from '../../util/error/error.event-handler';

@Module({
  imports: [TypeOrmModule.forFeature([User, Event, Group, Post]), CqrsModule],
  controllers: [SearchController],
  providers: [
    SearchService,
    SearchEventHandler,
    SearchGroupHandler,
    SearchUserHandler,
    SearchPostHandler,
    ErrorEventHandler,
  ],
})
export class SearchModule {}
