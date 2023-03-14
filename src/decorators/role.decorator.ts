import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../interfaces/role';

export const RoleDecorator = (...roles: UserRole[]) =>
  SetMetadata('roles', roles);
