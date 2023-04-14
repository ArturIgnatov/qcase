import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TemplateEntity } from '../../entities/template.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { TemplateService } from './template.service';
import { TemplateFiltersInput } from './inputs/template-filters.input';
import { CreateTemplateInput } from './inputs/create-template.input';
import { CurrentUser } from '../../decorators/user.decorator';
import { RequestUser } from '../../interfaces/request-user';
import { UpdateTemplateInput } from './inputs/update-template.input';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../../entities/user.entity';
import { CaseEntity } from '../../entities/case.entity';
import { OrganizationEntity } from '../../entities/organization.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectsService } from '../projects/projects.service';
import { TagEntity } from '../../entities/tag.entity';
import { GraphqlLoader, Loader, LoaderData } from 'nestjs-graphql-tools';
import { DataSource, In } from 'typeorm';

@UseGuards(JwtAuthGuard)
@Resolver(() => TemplateEntity)
export class TemplateResolver {
  constructor(
    private readonly templateService: TemplateService,
    private readonly userService: UsersService,
    private readonly organizationsService: OrganizationsService,
    private readonly projectService: ProjectsService,
    private readonly dataSource: DataSource,
  ) {}

  @Query(() => TemplateEntity)
  private template(@Args('id') id: string) {
    return this.templateService.getOne(id);
  }

  @Query(() => [TemplateEntity])
  private templates(
    @Args('filters', { nullable: true }) filters?: TemplateFiltersInput,
  ) {
    return this.templateService.getMany(filters);
  }

  @ResolveField(() => UserEntity)
  private user(@Parent() template: TemplateEntity) {
    return this.userService.getOneUser(template.createdUserId);
  }

  @ResolveField(() => ProjectEntity, { nullable: true })
  private project(@Parent() template: TemplateEntity) {
    return template.projectId
      ? this.projectService.getOne(template.projectId)
      : null;
  }

  @ResolveField(() => [CaseEntity])
  @GraphqlLoader()
  private async cases(@Loader() loader: LoaderData<TemplateEntity, string>) {
    const cases = await this.dataSource.getRepository(CaseEntity).find({
      where: {
        templateId: In(loader.ids),
      },
    });

    return loader.helpers.mapOneToManyRelation(cases, loader.ids, 'templateId');
  }

  @ResolveField(() => OrganizationEntity)
  private organization(@Parent() template: TemplateEntity) {
    return this.organizationsService.getOne(template.organizationId);
  }

  @ResolveField(() => [TagEntity])
  @GraphqlLoader()
  private async tags(@Loader() loader: LoaderData<TagEntity, string>) {
    const tags = await this.dataSource
      .getRepository(TagEntity)
      .find({ where: { templateId: In(loader.ids) } });
    return loader.helpers.mapOneToManyRelation(tags, loader.ids, 'templateId');
  }

  @Mutation(() => TemplateEntity)
  private createTemplate(
    @Args('createTemplateInput') createTemplateInput: CreateTemplateInput,
    @CurrentUser() user: RequestUser,
  ) {
    return this.templateService.create(createTemplateInput, user.id);
  }

  @Mutation(() => TemplateEntity)
  private updateTemplate(
    @Args('updateTemplateInput') updateTemplateInput: UpdateTemplateInput,
  ) {
    return this.templateService.update(updateTemplateInput);
  }

  @Mutation(() => String)
  private removeTemplate(@Args('id') id: string) {
    return this.templateService.remove(id);
  }
}
