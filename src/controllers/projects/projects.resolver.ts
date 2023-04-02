import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from '../../entities/project.entity';
import { CreateProjectInput } from './inputs/create-project.input';
import { UpdateProjectInput } from './inputs/update-project.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/user.decorator';
import { RequestUser } from '../../interfaces/request-user';
import { OrganizationEntity } from '../../entities/organization.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { ProjectFiltersInput } from './inputs/project-filters.input';

@Resolver(() => ProjectEntity)
@UseGuards(JwtAuthGuard)
export class ProjectsResolver {
  constructor(
    private projectService: ProjectsService,
    private organizationService: OrganizationsService,
  ) {}

  @Query(() => ProjectEntity)
  private project(@Args('id') id: string) {
    return this.projectService.getOne(id);
  }

  @Query(() => [ProjectEntity])
  public projects(
    @Args('filters', { nullable: true }) filters: ProjectFiltersInput,
  ) {
    return this.projectService.getMany(filters);
  }

  @ResolveField(() => OrganizationEntity)
  private organization(@Parent() project: ProjectEntity) {
    return this.organizationService.getByOrganizationIn(project.organizationId);
  }

  @Mutation(() => ProjectEntity)
  public createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @CurrentUser() user: RequestUser,
  ) {
    return this.projectService.create(createProjectInput, user.id);
  }

  @Mutation(() => ProjectEntity)
  public updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.update(updateProjectInput);
  }

  @Mutation(() => String)
  public removeProject(@Args('id') id: string) {
    return this.projectService.remove(id);
  }
}
