import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { OrganizationUserEntity } from '../../entities/organization-user.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => UserEntity)
  private user(@Args('id') id: string) {
    return this.userService.getOneUser(id);
  }

  @Query(() => [UserEntity])
  private users() {
    return this.userService.getAllUsers();
  }

  @ResolveField(() => [OrganizationUserEntity])
  public userOrganizations(@Parent() user: UserEntity) {
    return this.userService.getOrganizationUsers(user.id);
  }

  @Mutation(() => UserEntity)
  private createUser(@Args('createUser') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserEntity)
  private updateUser(@Args('updateUser') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput);
  }

  @Mutation(() => String)
  private removeUser(@Args('id') id: string) {
    return this.userService.removeUser(id);
  }
}
