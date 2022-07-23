import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Event } from './domain/entities/event.entity';
import { User } from '../user/domain/entities/user.entity';
import { EventDto } from './domain/dto/event.dto';
import { EventSearchDto } from './domain/dto/event-search.dto';
import { GetEventMemberQuery } from './cqrs/query/get-event-member.query';
import { GetEventNotEndQuery } from './cqrs/query/get-event-not-end.query';
import { GetEventQuery } from './cqrs/query/get-event.query';
import { GetEventGroupOwnerQuery } from './cqrs/query/get-event-group-owner.query';
import { GetEventOwnerQuery } from './cqrs/query/get-event-owner.query';
import { IsEventMemberQuery } from './cqrs/query/is-event-member.query';
import { CreateEventCommand } from './cqrs/command/create-event.command';
import { UpdateEventCommand } from './cqrs/command/update-event.command';
import { AddParticipantToEventCommand } from './cqrs/command/add-participant-to-event.command';
import { DeleteEventCommand } from './cqrs/command/delete-event.command';
import { RemoveParticipantToEventCommand } from './cqrs/command/remove-participant-to-event.command';
import { SearchEventWithNameQuery } from './cqrs/query/search-event-with-name.query';
import { RemoveExerciseToEventCommand } from './cqrs/command/remove-exercise-to-event.command';
import { AddExerciseToEventCommand } from './cqrs/command/add-exercise-to-event.command';
import { GetEventParticipationQuery } from './cqrs/query/get-event-participation.query';
import { GetEventWithEventIdQuery } from './cqrs/query/get-event-with-event-id.query';
import { Language } from '../language/domain/entities/language.entity';
import { AddLanguageToEventCommand } from './cqrs/command/add-language-to-event.command';

@Injectable()
export class EventService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async getById(id: string): Promise<Event> {
    return await this.queryBus.execute(new GetEventQuery(id));
  }
  async getAll(): Promise<Event[]> {
    return await this.queryBus.execute(new GetEventQuery());
  }

  async getAllNotEnd(): Promise<Event[]> {
    const dateNow = new Date(Date.now());
    return await this.queryBus.execute(new GetEventNotEndQuery(dateNow));
  }

  async getEventParticipant(eventId: string): Promise<User[]> {
    return await this.queryBus.execute(new GetEventMemberQuery(eventId));
  }

  async getEventParticipation(
    userId: string,
    offset: number,
    limit: number,
  ): Promise<Event[]> {
    return await this.queryBus.execute(
      new GetEventParticipationQuery(userId, offset, limit),
    );
  }

  async create(eventDto: EventDto): Promise<Event> {
    const newEvent: Event = await this.commandBus.execute(
      new CreateEventCommand(eventDto),
    );
    for (const exerciseTemplate of eventDto.exerciseTemplates) {
      await this.addExercise(newEvent.id, exerciseTemplate.id);
    }
    if (eventDto.exerciseTemplates) {
      const mySet = [];
      eventDto.languages = new Array<Language>();
      for (const exerciseTemplate of eventDto.exerciseTemplates) {
        if (mySet.indexOf(exerciseTemplate.language.id) === -1) {
          mySet.push(exerciseTemplate.language.id);
          await this.addLanguageToEvent(newEvent, exerciseTemplate.language);
        }
      }
    }
    return newEvent;
  }

  async update(id: string, eventDto: EventDto): Promise<Event> {
    await this.commandBus.execute(new UpdateEventCommand(id, eventDto));
    return await this.getById(id);
  }

  async delete(id: string): Promise<void> {
    return await this.commandBus.execute(new DeleteEventCommand(id));
  }

  async addParticipant(eventId: string, userId: string): Promise<void> {
    return await this.commandBus.execute(
      new AddParticipantToEventCommand(eventId, userId),
    );
  }

  async addExercise(eventId: string, exerciseId: string): Promise<void> {
    return await this.commandBus.execute(
      new AddExerciseToEventCommand(exerciseId, eventId),
    );
  }

  async removeParticipant(eventId: string, userId: string): Promise<void> {
    return await this.commandBus.execute(
      new RemoveParticipantToEventCommand(eventId, userId),
    );
  }

  async removeExercise(eventId: string, exerciseId: string): Promise<void> {
    return await this.commandBus.execute(
      new RemoveExerciseToEventCommand(exerciseId, eventId),
    );
  }

  async getOwner(eventId: string): Promise<User> {
    return await this.queryBus.execute(new GetEventOwnerQuery(eventId));
  }

  async getGroupOwners(eventId: string): Promise<User[]> {
    return await this.queryBus.execute(new GetEventGroupOwnerQuery(eventId));
  }

  async isOwner(userId: string, eventId: string): Promise<boolean> {
    return (await this.getGroupOwners(eventId))
      .concat(await this.getOwner(eventId))
      .some((user) => user.id === userId);
  }

  async isMember(eventId: string, userId: string): Promise<boolean> {
    return await this.queryBus.execute(new IsEventMemberQuery(eventId, userId));
  }

  // specific research
  async getEventSearch(eventSearchDto: EventSearchDto): Promise<Event[]> {
    throw 'not implemented'; //TODO
  }

  async getByName(name: string): Promise<Event[]> {
    return await this.queryBus.execute(new SearchEventWithNameQuery(name));
  }

  async getByGroupId(groupId: string, offset: string, limit: string) {
    return await this.queryBus.execute(
      new GetEventWithEventIdQuery(groupId, offset, limit),
    );
  }

  private async addLanguageToEvent(newEvent: Event, language: Language) {
    await this.commandBus.execute(
      new AddLanguageToEventCommand(newEvent.id, language.id),
    );
  }
}
