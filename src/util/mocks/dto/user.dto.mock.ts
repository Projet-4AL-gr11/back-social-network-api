import { UserDto } from '../../../api/user/domain/dto/user.dto';
import { UserType } from '../../../api/user/domain/enum/user-type.enum';

const mockUser: UserDto = {
  ...{
    id: '1',
    email: 'user@email.com',
    username: 'Billy',
    password: 'hash',
    userType: UserType.USER,
  },
};

export default mockUser;
