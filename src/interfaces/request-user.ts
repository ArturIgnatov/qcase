import { UserRole } from './role';

export interface RequestUser {
  id: string;
  role: UserRole;
}
