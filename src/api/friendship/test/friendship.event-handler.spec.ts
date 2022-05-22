import { AcceptFriendshipRequestEventHandler } from '../cqrs/event-handler/accept-friendship-request.event-handler';
import { Test } from '@nestjs/testing';
import { CancelFriendshipRequestEventHandler } from '../cqrs/event-handler/cancel-friendship-request-event.handler';
import { RemoveFriendshipEventHandler } from '../cqrs/event-handler/remove-friendship.event-handler';
import { SendFriendshipRequestEventHandler } from '../cqrs/event-handler/send-friendship-request.event-handler';
import { logger } from '../../../util/config/winston-logger.config';

describe('FriendshipEventHendler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AcceptFriendshipRequestEventHendler', () => {
    let handler: AcceptFriendshipRequestEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [AcceptFriendshipRequestEventHandler],
      }).compile();
      handler = mod.get(AcceptFriendshipRequestEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ senderId: '1', userId: '2' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('CancelFriendshipRequestEventHandler', () => {
    let handler: CancelFriendshipRequestEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [CancelFriendshipRequestEventHandler],
      }).compile();
      handler = mod.get(CancelFriendshipRequestEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ senderId: '1', userId: '2' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('RemoveFriendshipEventHandler', () => {
    let handler: RemoveFriendshipEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [RemoveFriendshipEventHandler],
      }).compile();
      handler = mod.get(RemoveFriendshipEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ senderId: '1', userId: '2' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('SendFriendshipRequestEventHandler', () => {
    let handler: SendFriendshipRequestEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [SendFriendshipRequestEventHandler],
      }).compile();
      handler = mod.get(SendFriendshipRequestEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ senderId: '1', userId: '2' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });
});
