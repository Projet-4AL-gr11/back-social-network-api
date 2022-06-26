import { Conversation } from '../../../conversation/domain/entities/conversation.entity';

export class MessageDto {
  constructor(
    public readonly content: string,
    public readonly conversation: Conversation,
  ) {}
}
