import { Request } from 'express';
import { User } from '../../user/domain/entities/user.entity';

export interface RequestUser extends Request {
  user: User;
}
