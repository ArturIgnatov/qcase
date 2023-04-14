import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationUsersInput {
  @Field(() => ID)
  organizationId: string;
}
