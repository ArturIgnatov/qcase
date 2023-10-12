import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInvitesService } from './user-invites.service';
import { CreateUserInviteInput } from './inputs/create-user-invite.input';
import { UserInviteEntity } from '../../entities/user-invite.entity';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserInvitesInput } from './inputs/user-invites.input';

@UseGuards(JwtAuthGuard)
@Resolver(() => UserInviteEntity)
export class UserInvitesResolver {
  constructor(private readonly userInviteService: UserInvitesService) {}

  @Query(() => [UserInviteEntity])
  private userInvites(
    @Args('filters', { nullable: true }) filters?: UserInvitesInput,
  ) {
    return this.userInviteService.getMany(filters);
  }

  @UsePipes(new ValidationPipe())
  @Mutation(() => UserInviteEntity)
  public createUserInvite(
    @Args('createUserInviteInput') createUserInviteInput: CreateUserInviteInput,
  ) {
    return this.userInviteService.createInvite(createUserInviteInput);
  }
}
