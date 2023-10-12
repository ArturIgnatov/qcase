import { registerEnumType } from '@nestjs/graphql';

export enum TestCaseCriticality {
  LOW,
  MIDDLE,
  HIGH,
  CRITICAL,
  BLOCKER,
}

registerEnumType(TestCaseCriticality, {
  name: 'TestCaseCriticality',
  description: 'Criticality for test-case',
});
