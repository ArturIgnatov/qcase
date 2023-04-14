import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsUUID } from 'class-validator';
import { Errors } from '../../../interfaces/errors';

@InputType()
export class CreateUserInviteInput {
  @IsUUID()
  @Field(() => ID)
  organizationId: string;

  @Field()
  @IsEmail(undefined, { message: Errors.BAD_EMAIL })
  email: string;
}
