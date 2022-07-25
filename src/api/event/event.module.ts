import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../user/domain/entities/user.entity';
import { Event } from './domain/entities/event.entity';
import { EventController } from './event.controller';
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
import { EventRanking } from '../execution/domain/entities/event-ranking.entity';
import { GetEventParticipationHandler } from './cqrs/handler/query/get-event-participation.handler';
import { CreateEventEventHandler } from './cqrs/event-handler/create-event.event-handler';
import { AddExerciseToEventEventHandler } from './cqrs/event-handler/add-exercise-to-event.event-handler';
import { AddParticipantToEventEventHandler } from './cqrs/event-handler/add-participant-to-event.event-handler';
import { DeleteEventEventHandler } from './cqrs/event-handler/delete-event.event-handler';
import { RemoveExerciseToEventEventHandler } from './cqrs/event-handler/remove-exercise-to-event.event-handler';
import { RemoveParticipantToEventEventHandler } from './cqrs/event-handler/remove-participant-to-event.event-handler';
import { UpdateEventEventHandler } from './cqrs/event-handler/update-event.event-handler';
import { ErrorEventHandler } from '../../util/error/error.event-handler';
import { GetEventWithGroupIdHandler } from './cqrs/handler/query/get-event-with-group-id.handler';
import { AddLanguageToEventEventHandler } from './cqrs/event-handler/add-language-to-event.event-handler';
import { AddLanguageToEventHandler } from './cqrs/handler/command/add-language-to-event.handler';

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
    GetEventParticipationHandler,
    SearchEventWithNameHandler,
    RemoveParticipantHandler,
    RemoveExerciseToEventHandler,
    AddParticipantToEventHandler,
    AddExerciseToEventHandler,
    CreateEventHandler,
    DeleteEventHandler,
    UpdateEventHandler,
    CreateEventEventHandler,
    AddExerciseToEventEventHandler,
    AddParticipantToEventEventHandler,
    DeleteEventEventHandler,
    RemoveExerciseToEventEventHandler,
    RemoveParticipantToEventEventHandler,
    UpdateEventEventHandler,
    GetEventWithGroupIdHandler,
    AddLanguageToEventEventHandler,
    AddLanguageToEventHandler,
    ErrorEventHandler,
  ],
})
export class EventModule {}
