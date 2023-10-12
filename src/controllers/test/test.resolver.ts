import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TestEntity } from '../../entities/test.entity';
import { TestService } from './test.service';
import { TestFiltersInput } from './inputs/test-filters.input';
import { CreateTestInput } from './inputs/create-test.input';
import { TestTagsEntity } from '../../entities/test-tags.entity';
import { TestTagsService } from '../test-tags/test-tags.service';
import { UserEntity } from '../../entities/user.entity';
import { TemplateEntity } from '../../entities/template.entity';
import { UsersService } from '../users/users.service';
import { ProjectsService } from '../projects/projects.service';
import { ProjectEntity } from '../../entities/project.entity';
import { TestCaseEntity } from '../../entities/test-case.entity';
import { GraphqlLoader, Loader, LoaderData } from 'nestjs-graphql-tools';
import { DataSource, In } from 'typeorm';

@Resolver(() => TestEntity)
export class TestResolver {
  constructor(
    private readonly testService: TestService,
    private readonly testTagsService: TestTagsService,
    private readonly userService: UsersService,
    private readonly projectService: ProjectsService,
    private readonly dataSource: DataSource,
  ) {}

  @Query(() => TestEntity)
  private test(@Args('id') id: string) {
    return this.testService.getOne(id);
  }

  @Query(() => [TestEntity])
  private tests(
    @Args('filers', { nullable: true }) filters?: TestFiltersInput,
  ) {
    return this.testService.getMany(filters);
  }

  @ResolveField(() => ProjectEntity, { nullable: true })
  private project(@Parent() test: TestEntity) {
    return test.projectId ? this.projectService.getOne(test.projectId) : null;
  }

  @ResolveField(() => UserEntity)
  private createdUser(@Parent() template: TemplateEntity) {
    return this.userService.getOneUser(template.createdUserId);
  }

  @ResolveField(() => UserEntity, { nullable: true })
  private responsible(@Parent() test: TestEntity) {
    return test.responsibleId
      ? this.userService.getOneUser(test.responsibleId)
      : null;
  }

  @ResolveField(() => UserEntity, { nullable: true })
  private executor(@Parent() test: TestEntity) {
    return test.executorId
      ? this.userService.getOneUser(test.executorId)
      : null;
  }

  @ResolveField(() => [TestCaseEntity])
  @GraphqlLoader()
  async testCases(@Loader() loader: LoaderData<TestEntity, string>) {
    const testCases = await this.dataSource.getRepository(TestCaseEntity).find({
      where: {
        testId: In(loader.ids),
      },
    });

    return loader.helpers.mapOneToManyRelation(testCases, loader.ids, 'testId');
  }

  @ResolveField(() => [TestTagsEntity])
  private tags(@Parent() test: TestEntity) {
    return this.testTagsService.getByTestId(test.id);
  }

  @Mutation(() => TestEntity)
  private createTest(
    @Args('createTestInput') createTestInput: CreateTestInput,
  ) {
    return this.testService.create(createTestInput);
  }

  @Mutation(() => ID)
  private removeTest(@Args('id') id: string) {
    return this.testService.delete(id);
  }
}
