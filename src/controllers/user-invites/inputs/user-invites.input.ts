import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UserInvitesInput {
  @IsUUID()
  @Field(() => ID)
  organizationId: string;
}
