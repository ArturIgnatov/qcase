import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTestInput {
  @Field(() => ID)
  organizationId: string;

  @Field(() => ID, { nullable: true })
  projectId: string | null;

  @Field(() => ID, { description: 'User ID executor' })
  executorId: string;

  @Field(() => ID, { description: 'User ID responsible' })
  responsibleId: string;

  @Field()
  name: string;

  @Field({ nullable: true, defaultValue: '' })
  description: string;

  @Field(() => [ID], { nullable: true, defaultValue: [] })
  tagIds: string[];

  @Field(() => [ID], { nullable: true, defaultValue: [] })
  caseIds: string[];
}
