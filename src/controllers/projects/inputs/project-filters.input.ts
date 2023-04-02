import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectFiltersInput {
  @Field({ nullable: false })
  organizationId: string;
}
