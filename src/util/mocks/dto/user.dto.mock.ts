import { UserDto } from '../../../api/user/domain/dto/user.dto';
import { UserType } from '../../../api/user/domain/enum/user-type.enum';
import { User } from '../../../api/user/domain/entities/user.entity';
import { UserResponse } from '../../../api/user/domain/response/user.response';
import { UserListResponse } from '../../../api/user/domain/response/user-list.response';

export const mockUserDto: UserDto = {
  ...{
    id: '1',
    email: 'user@email.com',
    username: 'Billy',
    password: 'hash',
    userType: UserType.USER,
  },
};

export const mockUser1: User = new User();
mockUser1.id = '1';
mockUser1.email = 'user@email.com';
mockUser1.username = 'billy';
mockUser1.password = 'hash';
mockUser1.userType = UserType.USER;

export const mockUser2: User = new User();
mockUser2.id = '2';
mockUser2.email = 'user2@email.com';
mockUser2.username = 'billy2';
mockUser2.password = 'hash';
mockUser2.userType = UserType.USER;

export const mockedUserList: UserDto[] = [
  {
    ...{
      id: '1',
      email: 'user@email.com',
      username: 'Billy',
      password: 'hash',
      userType: UserType.USER,
    },
  },
  {
    ...{
      id: '2',
      email: 'user2@email.com',
      username: 'Billy2',
      password: 'hash',
      userType: UserType.USER,
    },
  },
];

const user1 = new UserResponse('1', 'Billy', 'user@email.com', UserType.USER);
const user2 = new UserResponse('2', 'Billy2', 'user2@email.com', UserType.USER);
export const mockedUserListResponse = new UserListResponse([user1, user2]);
