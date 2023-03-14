import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';

@Resolver('User')
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => UserEntity)
  private getUser(@Args('id') id: string) {
    return this.userService.getOneUser(id);
  }

  @Query(() => [UserEntity])
  private getUsers() {
    return this.userService.getAllUsers();
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
