import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTemplateInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  description: string;
}
