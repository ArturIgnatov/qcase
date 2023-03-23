import { registerEnumType } from '@nestjs/graphql';

export enum OrganizationStatus {
  ACTIVE,
  DISABLE,
  BLOCKED,
}

registerEnumType(OrganizationStatus, {
  name: 'OrganizationStatus',
  description: 'The organization statuses',
});
