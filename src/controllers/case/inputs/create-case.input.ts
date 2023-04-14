import { Field, ID, InputType } from '@nestjs/graphql';
import { CaseImportance } from '../../../interfaces/case-importance';

@InputType()
export class CreateCaseInput {
  @Field(() => ID)
  templateId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  precondition: string;

  @Field({ nullable: true })
  expectedResult: string;

  @Field(() => CaseImportance)
  importance: CaseImportance;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  steps: string[];

  @Field(() => [ID], { nullable: true, defaultValue: [] })
  tagIds: string[];
}
