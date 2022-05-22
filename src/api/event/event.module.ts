import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../user/domain/entities/user.entity';
import { Event } from './domain/entities/event.entity';
import { EventController } from './event.Controller';
import { EventService } from './event.service';
import { GetEventGroupOwnerHandler } from './cqrs/handler/query/get-event-group-owner.handler';
import { IsEventMemberHandler } from './cqrs/handler/query/is-event-member.handler';
import { GetEventHandler } from './cqrs/handler/query/get-event.handler';
import { GetEventOwnerHandler } from './cqrs/handler/query/get-event-owner.handler';
import { GetEventNotEndHandler } from './cqrs/handler/query/get-event-not-end.handler';
import { GetEventMemberHandler } from './cqrs/handler/query/get-event-member.handler';
import { SearchEventWithNameHandler } from './cqrs/handler/query/search-event-with-name.handler';
import { AddParticipantToEventHandler } from './cqrs/handler/command/add-participant-to-event.handler';
import { CreateEventHandler } from './cqrs/handler/command/create-event.handler';
import { DeleteEventHandler } from './cqrs/handler/command/delete-event.handler';
import { RemoveParticipantHandler } from './cqrs/handler/command/remove-participant.handler';
import { UpdateEventHandler } from './cqrs/handler/command/update-event.handler';
import { AddExerciseToEventHandler } from './cqrs/handler/command/add-exercise-to-event.handler';
import { RemoveExerciseToEventHandler } from './cqrs/handler/command/remove-exercise-to-event.handler';
import { EventRanking } from '../leaderboard/domain/entities/event-ranking.entity';
import { GetEventParticipationHandler } from './cqrs/handler/query/get-event-participation.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User, EventRanking]), CqrsModule],
  controllers: [EventController],
  providers: [
    EventService,
    GetEventHandler,
    GetEventOwnerHandler,
    GetEventNotEndHandler,
    GetEventMemberHandler,
    GetEventGroupOwnerHandler,
    IsEventMemberHandler,
    SearchEventWithNameHandler,
    AddParticipantToEventHandler,
    CreateEventHandler,
    DeleteEventHandler,
    RemoveParticipantHandler,
    UpdateEventHandler,
    AddExerciseToEventHandler,
    RemoveExerciseToEventHandler,
    GetEventParticipationHandler,
  ],
})
export class EventModule {}
