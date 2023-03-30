import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field(() => ID)
  organizationId: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  color: string;
}
