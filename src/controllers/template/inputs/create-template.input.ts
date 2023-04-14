import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTemplateInput {
  @Field(() => ID)
  organizationId: string;

  @Field(() => ID, { nullable: true })
  projectId: string | null;

  @Field(() => [ID], { nullable: true, defaultValue: [] })
  tagIds: string[];

  @Field()
  name: string;

  @Field({ nullable: true, defaultValue: '' })
  description: string;
}
