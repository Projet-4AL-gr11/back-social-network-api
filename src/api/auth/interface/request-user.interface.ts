import { Request } from 'express';
import { User } from '../../user/entities/user.entity';

export interface RequestUser extends Request {
  user: User;
}
