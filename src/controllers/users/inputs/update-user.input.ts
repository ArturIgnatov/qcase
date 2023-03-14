import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  fname: string;

  @Field({ nullable: true })
  lname: string;

  @Field({ nullable: true })
  status: string;
}
