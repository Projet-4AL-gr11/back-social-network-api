import { CreateGroupCommand } from '../cqrs/command/create-group.command';
import { User } from '../../user/domain/entities/user.entity';
import { UserType } from '../../user/domain/enum/user-type.enum';
import { GroupDto } from '../domain/dto/group.dto';
import { DeleteGroupCommand } from '../cqrs/command/delete-group.command';
import { RemoveUserFromGroupCommand } from '../cqrs/command/remove-user-from-group.command';
import { UpdateGroupCommand } from '../cqrs/command/update-group.command';
import { AddGroupFollowerCommand } from '../cqrs/command/add-group-follower.command';
import { RemoveGroupFollowerCommand } from '../cqrs/command/remove-group-follower.command';
import { RemoveOptions, SaveOptions } from 'typeorm';

describe('GroupCommand', () => {
  const mockUser1: User = new User();
  mockUser1.id = '1';
  mockUser1.email = 'user@email.com';
  mockUser1.username = 'billy';
  mockUser1.password = 'hash';
  mockUser1.userType = UserType.USER;

  const mockGroupDto = new GroupDto('bonjour', [mockUser1]);
  describe('CreateGroupCommand', () => {
    it('should create a CreateGroupCommand instance', () => {
      const command = new CreateGroupCommand(mockUser1, mockGroupDto);
      expect(command.user).toBe(mockUser1);
      expect(command.groupDto).toBe(mockGroupDto);
      expect(command instanceof CreateGroupCommand).toBe(true);
    });
  });

  describe('DeleteGroupCommand', () => {
    it('should create a DeleteGroupCommand instance', () => {
      const command = new DeleteGroupCommand('1');
      expect(command.groupId).toBe('1');
      expect(command instanceof DeleteGroupCommand).toBe(true);
    });
  });

  describe('RemoveUserFromGroupCommand', () => {
    it('should create a RemoveUserFromGroupCommand instance', () => {
      const command = new RemoveUserFromGroupCommand('1', '1');
      expect(command.groupId).toBe('1');
      expect(command.userId).toBe('1');
      expect(command instanceof RemoveUserFromGroupCommand).toBe(true);
    });
  });

  describe('UpdateGroupCommand', () => {
    it('should create a UpdateGroupCommand instance', () => {
      const command = new UpdateGroupCommand('1', mockGroupDto);
      expect(command.groupId).toBe('1');
      expect(command.groupDto).toBe(mockGroupDto);
      expect(command instanceof UpdateGroupCommand).toBe(true);
    });
  });

  describe('AddGroupFollowerCommand', () => {
    it('should create a AddGroupFollowerCommand instance', () => {
      const command = new AddGroupFollowerCommand(
        {
          groups: [],
          recover(options: SaveOptions | undefined): Promise<User> {
            return Promise.resolve(undefined);
          },
          remove(options: RemoveOptions | undefined): Promise<User> {
            return Promise.resolve(undefined);
          },
          reported: [],
          reports: [],
          requestedFriends: [],
          save(options: SaveOptions | undefined): Promise<User> {
            return Promise.resolve(undefined);
          },
          softRemove(options: SaveOptions | undefined): Promise<User> {
            return Promise.resolve(undefined);
          },
          hasId(): boolean {
            return false;
          },
          reload(): Promise<void> {
            return Promise.resolve(undefined);
          },
          async setPassword(password: string): Promise<void> {
            return Promise.resolve(undefined);
          },
          bannerPicture: undefined,
          bio: '',
          blockedUsers: [],
          blockers: [],
          comments: [],
          connections: [],
          createdEvents: [],
          createdPosts: [],
          email: '',
          eventRanking: [],
          eventsParticipation: [],
          followedGroups: [],
          friendRequests: [],
          friendsOne: [],
          friendsTwo: [],
          groupRequests: [],
          joinedConversations: [],
          leaderboards: [],
          likedPosts: [],
          messages: [],
          password: '',
          profilePicture: undefined,
          userType: undefined,
          username: '',
          id: '1',
        },
        {
          bannerPicture: undefined,
          conversation: undefined,
          events: [],
          followers: [],
          members: [],
          name: '',
          picture: undefined,
          posts: [],
          reported: [],
          requestSend: [],
          async setConversation(): Promise<void> {
            return Promise.resolve(undefined);
          },
          id: '2',
        },
      );
      expect(command.user.id).toBe('1');
      expect(command.group.id).toBe('2');
      expect(command instanceof AddGroupFollowerCommand).toBe(true);
    });
  });

  describe('RemoveGroupFollowerCommand', () => {
    it('should create a RemoveGroupFollowerCommand instance', () => {
      const command = new RemoveGroupFollowerCommand('1', '2');
      expect(command.userId).toBe('1');
      expect(command.groupId).toBe('2');
      expect(command instanceof RemoveGroupFollowerCommand).toBe(true);
    });
  });
});
