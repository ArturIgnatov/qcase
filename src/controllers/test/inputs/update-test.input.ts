import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTestInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true, defaultValue: '' })
  description: string;

  @Field(() => ID, { nullable: true })
  projectId: string;

  @Field(() => [ID], { nullable: true, defaultValue: [] })
  tagIds: string[];

  @Field(() => [ID], { nullable: true, defaultValue: [] })
  caseIds: string;
}
