import { DeleteGroupEvent } from '../cqrs/event/delete-group.event';
import { CreateGroupEvent } from '../cqrs/event/create-group.event';
import { RemoveUserFromGroupEvent } from '../cqrs/event/remove-user-from-group.event';
import { UpdateGroupEvent } from '../cqrs/event/update-group.event';
import { AddGroupFollowerEvent } from "../cqrs/event/add-group-follower.event";
import { RemoveGroupFollowerEvent } from "../cqrs/event/remove-group-follower.event";

describe('GroupEvent', () => {
  describe('DeleteGroupEvent', () => {
    it('should create a DeleteGroupEvent instance', () => {
      const event = new DeleteGroupEvent('1');
      expect(event.groupId).toBe('1');
      expect(event instanceof DeleteGroupEvent).toBe(true);
    });
  });

  describe('CreateGroupEvent', () => {
    it('should create a CreateGroupEvent instance', () => {
      const event = new CreateGroupEvent('1', 'bonjour');
      expect(event.userId).toBe('1');
      expect(event.groupName).toBe('bonjour');
      expect(event instanceof CreateGroupEvent).toBe(true);
    });
  });

  describe('RemoveUserFromGroupEvent', () => {
    it('should create a RemoveUserFromGroupEvent instance', () => {
      const event = new RemoveUserFromGroupEvent('1', 'bonjour');
      expect(event.userId).toBe('1');
      expect(event.groupId).toBe('bonjour');
      expect(event instanceof RemoveUserFromGroupEvent).toBe(true);
    });
  });

  describe('UpdateGroupEvent', () => {
    it('should create a UpdateGroupEvent instance', () => {
      const event = new UpdateGroupEvent('1');
      expect(event.groupId).toBe('1');
      expect(event instanceof UpdateGroupEvent).toBe(true);
    });
  });

  describe('AddGroupFollowerEvent', () => {
    it('should create a AddGroupFollowerEvent instance', () => {
      const event = new AddGroupFollowerEvent('1', 'bonjour');
      expect(event.userId).toBe('1');
      expect(event.groupId).toBe('bonjour');
      expect(event instanceof AddGroupFollowerEvent).toBe(true);
    });
  });

  describe('RemoveGroupFollowerEvent', () => {
    it('should create a RemoveGroupFollowerEvent instance', () => {
      const event = new RemoveGroupFollowerEvent('1', 'bonjour');
      expect(event.userId).toBe('1');
      expect(event.groupId).toBe('bonjour');
      expect(event instanceof RemoveGroupFollowerEvent).toBe(true);
    });
  });
});
