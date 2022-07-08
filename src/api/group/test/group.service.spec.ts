import { GroupService } from '../group.service';
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Group } from '../domain/entities/group.entity';
import { User } from '../../user/domain/entities/user.entity';
import { UserType } from '../../user/domain/enum/user-type.enum';
import { GroupMembership } from '../domain/entities/group_membership.entity';
import { GroupDto } from '../domain/dto/group.dto';

describe('GroupService', () => {
  let service: GroupService;
  let commandBus: jest.Mock;
  let queryBus: jest.Mock;

  const mockUser1: User = new User();
  mockUser1.id = '1';
  mockUser1.email = 'user@email.com';
  mockUser1.username = 'billy';
  mockUser1.password = 'hash';
  mockUser1.userType = UserType.USER;

  const mockGroup = new Group();
  mockGroup.id = '1';
  mockGroup.name = 'superGroup';
  mockGroup.members = [new GroupMembership()];

  const mockGroupDto = new GroupDto('mockGroupDto', [mockUser1]);

  beforeEach(async () => {
    commandBus = jest.fn().mockResolvedValue('');
    queryBus = jest.fn().mockResolvedValue('');
    const modRef = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: QueryBus,
          useValue: {
            execute: queryBus,
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: commandBus,
          },
        },
      ],
    }).compile();
    service = modRef.get(GroupService);
  });

  describe('CreateGroup', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(mockGroup);
    });
    it('should return new group', async () => {
      expect(await service.create('1', mockGroupDto)).toBe(mockGroup);
    });
  });

  describe('DeleteGroup', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return new group', async () => {
      expect(await service.delete('1')).toBe(undefined);
    });
  });

  describe('UpdateGroup', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
      queryBus.mockResolvedValue(mockGroup);
    });
    it('should return new group', async () => {
      expect(await service.update('1', mockGroupDto)).toBe(mockGroup);
    });
  });

  describe('RemoveUserFromGroup', () => {
    beforeEach(async () => {
      commandBus.mockResolvedValue(undefined);
    });
    it('should return new group', async () => {
      expect(await service.removeUser('1', '1')).toBe(undefined);
    });
  });

  describe('getGroupWithUserId', () => {
    beforeEach(async () => {
      queryBus.mockResolvedValue(mockGroup);
    });
    it('should return list of groupMembership', async () => {
      expect(await service.getGroupWithUserId('1')).toBe(mockGroup);
    });
  });
});
