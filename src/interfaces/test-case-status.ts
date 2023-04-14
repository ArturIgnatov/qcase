import { registerEnumType } from '@nestjs/graphql';

export enum TestCaseStatus {
  SUCCESS,
  FAILED,
}

registerEnumType(TestCaseStatus, {
  name: 'TestCaseStatus',
  description: 'Statuses for test-case',
});
