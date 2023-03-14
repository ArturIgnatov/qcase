import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from '../../entities/project.entity';
import { CreateProjectInput } from './inputs/create-project.input';
import { UpdateProjectInput } from './inputs/update-project.input';

@Resolver()
export class ProjectsResolver {
  constructor(private projectService: ProjectsService) {}

  @Query(() => ProjectEntity)
  private getProject(@Args('id') id: string) {
    return this.projectService.getOne(id);
  }

  @Query(() => [ProjectEntity])
  public getProjects() {
    return this.projectService.getMany();
  }

  @Mutation(() => ProjectEntity)
  public createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectService.create(createProjectInput);
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
