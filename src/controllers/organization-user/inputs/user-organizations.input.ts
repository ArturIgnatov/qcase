import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserOrganizationsInput {
  @Field(() => ID)
  userId: string;
}
