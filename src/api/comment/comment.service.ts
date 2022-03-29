import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class CommentService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}
}
