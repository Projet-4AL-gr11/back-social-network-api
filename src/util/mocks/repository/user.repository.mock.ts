import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../../api/user/domain/entities/user.entity';

@EntityRepository(User)
export class UserRepositoryMock extends Repository<User> {}
