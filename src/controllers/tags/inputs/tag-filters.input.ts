import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TagFiltersInput {
  @Field(() => ID, { nullable: true })
  organizationId?: string;

  @Field(() => ID, { nullable: true })
  templateId?: string;

  @Field(() => ID, { nullable: true })
  caseId?: string;
}
