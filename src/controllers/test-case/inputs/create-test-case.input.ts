import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTestCaseInput {
  @Field(() => ID)
  testId: string;

  @Field(() => ID)
  caseId: string;
}
