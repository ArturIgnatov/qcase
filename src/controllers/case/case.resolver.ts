import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CaseService } from './case.service';
import { CaseFiltersInput } from './inputs/case-filters.input';
import { CaseEntity } from '../../entities/case.entity';
import { CreateCaseInput } from './inputs/create-case.input';
import { CurrentUser } from '../../decorators/user.decorator';
import { RequestUser } from '../../interfaces/request-user';
import { UpdateCaseInput } from './inputs/update-case.input';
import { UserEntity } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => CaseEntity)
export class CaseResolver {
  constructor(
    private readonly caseService: CaseService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => CaseEntity)
  private case(@Args('id') id: string) {
    return this.caseService.getOne(id);
  }

  @Query(() => [CaseEntity])
  private cases(
    @Args('filters', { nullable: true }) filters?: CaseFiltersInput,
  ) {
    return this.caseService.getMany(filters);
  }

  @ResolveField(() => UserEntity)
  private user(@Parent() caseParent: CaseEntity) {
    return this.usersService.getOneUser(caseParent.createdUserId);
  }

  @Mutation(() => CaseEntity)
  private createCase(
    @Args('createCaseInput') createCaseInput: CreateCaseInput,
    @CurrentUser() user: RequestUser,
  ) {
    return this.caseService.create(createCaseInput, user.id);
  }

  @Mutation(() => CaseEntity)
  private updateCase(
    @Args('updateCaseInput') updateCaseInput: UpdateCaseInput,
  ) {
    return this.caseService.update(updateCaseInput);
  }

  @Mutation(() => String)
  private removeCase(@Args('id') id: string) {
    return this.caseService.remove(id);
  }
}
