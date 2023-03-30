import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTagInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  color: string;
}
