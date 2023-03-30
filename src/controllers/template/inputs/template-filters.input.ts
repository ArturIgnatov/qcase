import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TemplateFiltersInput {
  @Field(() => ID, { nullable: true })
  organizationId?: string;
}
