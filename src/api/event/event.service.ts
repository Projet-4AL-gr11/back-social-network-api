import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Event } from './domain/entities/event.entity';
import { User } from '../user/domain/entities/user.entity';
import { EventDto } from "./domain/dto/event.dto";
import { EventSearchDto } from "./domain/dto/event-search.dto";

@Injectable()
export class EventService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async getById(id: string): Promise<Event> {
    return; //TODO
  }
  async getAll(): Promise<Event[]> {
    return; //TODO
  }

  async getAllNotEnd(): Promise<Event[]> {
    return; // TODO
  }

  async create(eventDto: EventDto): Promise<Event> {
    return; //TODO
  }

  async update(id: string, eventDto: EventDto): Promise<Event> {
    //TODO command Update
    return await this.getById(id);
  }

  async getEventParticipant(eventId: string): Promise<User[]> {
    return; //TODO
  }

  async addParticipant(eventId: string, userId: string): Promise<void> {
    return; //TODO
  }

  async removeParticipant(eventId: string, userId: string): Promise<void> {
    return; //TODO
  }

  async getOwner(eventId: string): Promise<User> {
    return; //TODO
  }

  async getGroupOwners(eventId: string): Promise<User[]> {
    return; //TODO
  }

  async isOwner(userId: string, eventId: string): Promise<boolean> {
    return; //TODO
  }

  async isMember(userid: string, eventId: string): Promise<boolean> {
    return; //TODO
  }

  // specific research
  async getEventSearch(eventSearchDto: EventSearchDto): Promise<Event[]> {
    return; //TODO
  }

  async getByName(name: string): Promise<Event[]> {
    return; //TODO
  }
}
