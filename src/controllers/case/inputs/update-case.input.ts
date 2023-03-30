import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCaseInput {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
