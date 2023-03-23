import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationFiltersInput {
  @Field(() => ID, { nullable: true })
  userId?: string;
}
