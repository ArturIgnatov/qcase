import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  fname: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  lname: string;
}
