import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCaseInput {
  @Field(() => ID)
  templateId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
