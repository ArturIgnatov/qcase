import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TagFiltersInput {
  @Field(() => ID, { nullable: true })
  organizationId: string | undefined;

  @Field(() => ID, { nullable: true })
  templateId: string | undefined;

  @Field(() => ID, { nullable: true })
  caseId: string | undefined;
}
