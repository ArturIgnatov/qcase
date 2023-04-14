import { registerEnumType } from '@nestjs/graphql';

export enum CaseImportance {
  LOW,
  MIDDLE,
  HIGH,
}

registerEnumType(CaseImportance, {
  name: 'CaseImportance',
  description: 'Importance status for case',
});
