import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TestCaseService } from './test-case.service';
import { TestCaseEntity } from '../../entities/test-case.entity';
import { TestCaseFiltersInput } from './inputs/test-case-filters.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateTestCaseInput } from './inputs/create-test-case.input';
import { TestEntity } from '../../entities/test.entity';
import { CaseEntity } from '../../entities/case.entity';
import { TestService } from '../test/test.service';
import { CaseService } from '../case/case.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => TestCaseEntity)
export class TestCaseResolver {
  constructor(
    private readonly testCaseService: TestCaseService,
    private readonly testService: TestService,
    private readonly caseService: CaseService,
  ) {}

  @Query(() => TestCaseEntity)
  private testCase(@Args('id') id: string) {
    return this.testCaseService.getOne(id);
  }

  @Query(() => [TestCaseEntity])
  private testCases(
    @Args('filters', { nullable: true }) filters?: TestCaseFiltersInput,
  ) {
    return this.testCaseService.getMany(filters);
  }

  @ResolveField(() => TestEntity)
  private test(@Parent() testCase: TestCaseEntity) {
    return this.testService.getOne(testCase.testId);
  }

  @ResolveField(() => CaseEntity)
  private case(@Parent() testCase: TestCaseEntity) {
    return this.caseService.getOne(testCase.caseId);
  }

  @Mutation(() => TestCaseEntity)
  private createTestCase(
    @Args('input') createTestCaseInput: CreateTestCaseInput,
  ) {
    return this.testCaseService.createOne(createTestCaseInput);
  }
}
