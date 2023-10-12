import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TestCaseFiltersInput {
  @Field(() => ID, { nullable: true })
  testId?: string;

  @Field(() => ID, { nullable: true })
  organizationId?: string;
}
