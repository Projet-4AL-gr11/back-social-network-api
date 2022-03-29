import { CreateGroupCommand } from '../cqrs/command/create-group.command';
import { User } from '../../user/domain/entities/user.entity';
import { UserType } from '../../user/domain/enum/user-type.enum';
import { GroupDto } from '../domain/dto/group.dto';
import { DeleteGroupCommand } from '../cqrs/command/delete-group.command';
import { RemoveUserFromGroupCommand } from '../cqrs/command/remove-user-from-group.command';
import { UpdateGroupCommand } from '../cqrs/command/update-group.command';
import { AddGroupFollowerCommand } from "../cqrs/command/add-group-follower.command";
import { RemoveGroupFollowerCommand } from "../cqrs/command/remove-group-follower.command";

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
      const command = new AddGroupFollowerCommand('1', '2');
      expect(command.userId).toBe('1');
      expect(command.groupId).toBe('2');
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
