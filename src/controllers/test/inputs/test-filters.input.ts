import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TestFiltersInput {
  @Field(() => ID, { nullable: true })
  organizationId?: string;
}
