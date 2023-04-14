import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => ID, { nullable: true })
  organizationId: string;

  @Field()
  email: string;

  @Field()
  fname: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  lname: string;
}
