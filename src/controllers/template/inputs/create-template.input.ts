import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTemplateInput {
  @Field(() => ID)
  organizationId: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  description: string;
}
