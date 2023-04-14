import { registerEnumType } from '@nestjs/graphql';

export enum TestStatus {
  WAITING,
  IN_PROGRESS,
  SUCCESS,
  FAILED,
}

registerEnumType(TestStatus, {
  name: 'TestStatus',
  description: 'Statuses for test',
});
