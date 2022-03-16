import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../query/get-user.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserResponse } from '../../domain/response/user.response';
import { UserListResponse } from '../../domain/response/user-list.response';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: GetUserQuery) {
    if (query.userId) {
      const user: UserResponse = {
        ...(await this.userRepository.findOneOrFail(query.userId)),
      };
      return user;
    }
    const userListResponse: UserListResponse = new UserListResponse();
    await this.userRepository.find().then((userList) => {
      userList.forEach((user) => {
        userListResponse.userList.push(
          new UserResponse(user.id, user.username, user.email, user.userType),
        );
      });
    });
    return userListResponse.userList;
  }
}
