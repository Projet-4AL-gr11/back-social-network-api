import { CreateGroupEventHandler } from '../cqrs/event-handler/create-group.event-handler';
import { Test } from '@nestjs/testing';
import { logger } from '../../../util/config/winston-logger.config';
import { DeleteGroupEventHandler } from '../cqrs/event-handler/delete-group.event-handler';
import { RemoveUserFromGroupEventHandler } from '../cqrs/event-handler/remove-user-from-group.event-handler';
import { UpdateGroupEventHandler } from '../cqrs/event-handler/update-group.event-handler';
import { RemoveGroupFollowEventHandler } from '../cqrs/event-handler/remove-group-follow.event-handler';
import { AddGroupFollowerEventHandler } from '../cqrs/event-handler/add-group-follower.event-handler';

describe('GroupEventHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('CreateGroupEventHandler', () => {
    let handler: CreateGroupEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [CreateGroupEventHandler],
      }).compile();
      handler = mod.get(CreateGroupEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ userId: '1', groupName: 'bonjour' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('DeleteGroupEventHandler', () => {
    let handler: DeleteGroupEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [DeleteGroupEventHandler],
      }).compile();
      handler = mod.get(DeleteGroupEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ groupId: '1' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('RemoveUserFromGroupEventHandler', () => {
    let handler: RemoveUserFromGroupEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [RemoveUserFromGroupEventHandler],
      }).compile();
      handler = mod.get(RemoveUserFromGroupEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ userId: '1', groupId: 'bonjour' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('UpdateGroupEventHandler', () => {
    let handler: UpdateGroupEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [UpdateGroupEventHandler],
      }).compile();
      handler = mod.get(UpdateGroupEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ groupId: '1' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('RemoveGroupFollowEventHandler', () => {
    let handler: RemoveGroupFollowEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [RemoveGroupFollowEventHandler],
      }).compile();
      handler = mod.get(RemoveGroupFollowEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ userId: '1', groupId: 'bonjour' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });

  describe('AddGroupFollowerEventHandler', () => {
    let handler: AddGroupFollowerEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [AddGroupFollowerEventHandler],
      }).compile();
      handler = mod.get(AddGroupFollowerEventHandler);
    });

    describe('handler', () => {
      it('should print correctly', () => {
        const consoleSpy = jest.spyOn(logger, 'info').mockImplementation();
        handler.handle({ userId: '1', groupId: 'bonjour' });
        expect(consoleSpy).toBeCalledTimes(1);
      });
    });
  });
});
