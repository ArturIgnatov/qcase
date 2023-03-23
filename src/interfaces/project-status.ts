import { registerEnumType } from '@nestjs/graphql';

export enum ProjectStatus {
  ACTIVE,
  DISABLE,
  BLOCKED,
}

registerEnumType(ProjectStatus, {
  name: 'ProjectStatus',
  description: 'The organization statuses',
});
