import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OrganizationsService } from './organizations.service';
import { OrganizationEntity } from '../../entities/organization.entity';
import { CreateOrganizationInput } from './inputs/create-organization.input';
import { UpdateOrganizationInput } from './inputs/update-organization.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/user.decorator';
import { RequestUser } from '../../interfaces/request-user';
import { OrganizationUserEntity } from '../../entities/organization-user.entity';
import { ProjectEntity } from '../../entities/project.entity';
import { OrganizationFiltersInput } from './inputs/organization-filters.input';
import {
  GraphqlLoader,
  Loader,
  LoaderData,
  SelectedFields,
  SelectedFieldsResult,
} from 'nestjs-graphql-tools';
import { TagEntity } from '../../entities/tag.entity';
import { DataSource, In } from 'typeorm';
import { TestEntity } from '../../entities/test.entity';
import * as process from 'process';

@UseGuards(JwtAuthGuard)
@Resolver(() => OrganizationEntity)
export class OrganizationsResolver {
  constructor(
    private readonly organizationService: OrganizationsService,
    private readonly dataSource: DataSource,
  ) {}

  @Query(() => OrganizationEntity)
  private organization(@Args('id') id: string) {
    return this.organizationService.getOne(id);
  }

  @Query(() => [OrganizationEntity])
  private organizations(
    @SelectedFields({ sqlAlias: 'organization' }) fields: SelectedFieldsResult,
    @Args('filters', { nullable: true }) filters?: OrganizationFiltersInput,
  ) {
    return this.organizationService.getMany(fields, filters);
  }

  @ResolveField(() => [OrganizationUserEntity])
  public organizationUsers(@Parent() organization: OrganizationEntity) {
    return this.organizationService.getOrganizationUsers(organization.id);
  }

  @ResolveField(() => [ProjectEntity])
  @GraphqlLoader()
  private async projects(
    @Parent() organization: OrganizationEntity,
    @Loader() loader: LoaderData<ProjectEntity, string>,
  ) {
    const projects = await this.dataSource.getRepository(ProjectEntity).find({
      where: {
        organizationId: In(loader.ids),
      },
    });

    return loader.helpers.mapOneToManyRelation(
      projects,
      loader.ids,
      'organizationId',
    );
  }

  @ResolveField(() => [TestEntity])
  @GraphqlLoader()
  private async tests(
    @Parent() organization: OrganizationEntity,
    @Loader() loader: LoaderData<TestEntity, string>,
  ) {
    const tests = await this.dataSource.getRepository(TestEntity).find({
      where: {
        organizationId: In(loader.ids),
      },
    });

    return loader.helpers.mapOneToManyRelation(
      tests,
      loader.ids,
      'organizationId',
    );
  }

  @ResolveField(() => [TagEntity])
  private async tags(
    @Parent() organization: OrganizationEntity,
    @Loader() loader: LoaderData<TagEntity, string>,
  ) {
    const tags = await this.dataSource.getRepository(TagEntity).find({
      where: {
        organizationId: In(loader.ids),
      },
    });

    return loader.helpers.mapOneToManyRelation(
      tags,
      loader.ids,
      'organizationId',
    );
  }

  @Mutation(() => OrganizationEntity)
  private createOrganization(
    @Args('createOrgInput')
    createOrgInput: CreateOrganizationInput,
    @CurrentUser() user: RequestUser,
  ) {
    return this.organizationService.create(createOrgInput, user.id);
  }

  @Mutation(() => OrganizationEntity)
  private updateOrganization(
    @Args('updateOrgInput') updateOrgInput: UpdateOrganizationInput,
  ) {
    return this.organizationService.update(updateOrgInput);
  }

  @Mutation(() => String)
  private removeOrganization(@Args('id') id: string) {
    return this.organizationService.remove(id);
  }
}
