import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './domain/entities/event.entity';
import { User } from '../user/domain/entities/user.entity';
import { EventDto } from './domain/dto/event.dto';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('id')
  async getById(@Param('id') id: string): Promise<Event> {
    return await this.eventService.getById(id);
  }

  @Get()
  async getAll(): Promise<Event[]> {
    return await this.eventService.getAll();
  }
  @Get('notEnd')
  async getAllNotEnd(): Promise<Event[]> {
    return await this.eventService.getAllNotEnd();
  }

  @Get('searchByName/:name')
  async getByName(@Param('name') name: string): Promise<Event[]> {
    return await this.eventService.getByName(name);
  }

  @Get('participants/:id')
  async getParticipant(@Param('id') id: string): Promise<User[]> {
    return await this.eventService.getEventParticipant(id);
  }

  @Get('owner/:id')
  async getOwner(@Param('id') id: string): Promise<User> {
    return await this.eventService.getOwner(id);
  }

  @Get('groupOwner/:id')
  async getGroupOwner(@Param('id') id: string): Promise<User[]> {
    return await this.eventService.getGroupOwners(id);
  }

  @Get('isOwner/:id')
  async isOwner(
    @Param('id') id: string,
    @Body() userId: string,
  ): Promise<boolean> {
    return await this.eventService.isOwner(id, userId);
  }

  @Get('isMember/:id')
  async isMember(
    @Param('id') id: string,
    @Body() userId: string,
  ): Promise<boolean> {
    return await this.eventService.isMember(id, userId);
  }

  @Post()
  async create(@Body() eventDto: EventDto): Promise<Event> {
    return this.eventService.create(eventDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() eventDto: EventDto,
  ): Promise<Event> {
    return this.eventService.update(id, eventDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.eventService.delete(id);
  }

  @Post('participant/:id')
  async addParticipant(
    @Param('id') id: string,
    @Body() userId: string,
  ): Promise<void> {
    return this.eventService.addParticipant(id, userId);
  }

  @Delete('participant/:id')
  async removeParticipant(
    @Param('id') id: string,
    @Body() userId: string,
  ): Promise<void> {
    return this.eventService.removeParticipant(id, userId);
  }
}
