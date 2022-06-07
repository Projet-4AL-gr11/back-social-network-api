import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req, UseGuards
} from "@nestjs/common";
import { EventService } from './event.service';
import { Event } from './domain/entities/event.entity';
import { User } from '../user/domain/entities/user.entity';
import { EventDto } from './domain/dto/event.dto';
import { RequestUser } from '../auth/interface/request-user.interface';
import JwtRefreshGuard from "../auth/guards/jwt-refresh-token.guard";

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

  @Get('participation/:id')
  async getParticipation(@Param('id') id: string): Promise<Event[]> {
    return await this.eventService.getEventParticipation(id);
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
  @UseGuards(JwtRefreshGuard)
  async isOwner(
    @Param('id') id: string,
    @Req() request: RequestUser,
  ): Promise<boolean> {
    const { user } = request;
    return await this.eventService.isOwner(id, user.id);
  }

  @Get('isMember/:id')
  @UseGuards(JwtRefreshGuard)
  async isMember(
    @Param('id') id: string,
    @Req() request: RequestUser,
  ): Promise<boolean> {
    const { user } = request;
    return await this.eventService.isMember(id, user.id);
  }

  @Post()
  @UseGuards(JwtRefreshGuard)
  async create(
    @Body() eventDto: EventDto,
    @Req() request: RequestUser,
  ): Promise<Event> {
    eventDto.user = request.user;
    return this.eventService.create(eventDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() eventDto: EventDto,
  ): Promise<Event> {
    return this.eventService.update(id, eventDto);
  }

  // TODO: Rajouter une vérif pour si appartient a groupOwner
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

  @Put('participant/:id')
  async removeParticipant(
    @Param('id') id: string,
    @Body() userId: string,
  ): Promise<void> {
    return this.eventService.removeParticipant(id, userId);
  }

  @Post('exercise/:id')
  async addExercise(
    @Param('id') id: string,
    @Body() exerciseId: string,
  ): Promise<void> {
    return this.eventService.addExercise(id, exerciseId);
  }

  @Put('exercise/:id')
  async removeExercise(
    @Param('id') id: string,
    @Body() exerciseId: string,
  ): Promise<void> {
    return this.eventService.removeExercise(id, exerciseId);
  }
}
