import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  USER,
  ADMIN,
  SUPER_ADMIN,
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'The user supported roles.',
});
