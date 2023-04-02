import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../../entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './inputs/create-project.input';
import { UpdateProjectInput } from './inputs/update-project.input';
import { ProjectFiltersInput } from './inputs/project-filters.input';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  public async getOne(id: string) {
    return await this.projectRepository.findOneBy({ id });
  }

  public async getMany(filters: ProjectFiltersInput) {
    const builder = this.projectRepository.createQueryBuilder('project');

    if (filters?.organizationId) {
      builder.where('project.organizationId = :organizationId', {
        organizationId: filters.organizationId,
      });
    }

    return builder.getMany();
  }

  public async getByOrganizationId(organizationId: string) {
    return this.projectRepository.find({
      where: { organizationId },
      // take: peerPage,
      // skip: peerPage * page,
    });
  }

  public async create(
    createProjectInput: CreateProjectInput,
    createdUserId: string,
  ) {
    return await this.projectRepository.save({
      ...createProjectInput,
      createdUserId,
    });
  }

  public async update(updateProjectInput: UpdateProjectInput) {
    await this.projectRepository.update(
      { id: updateProjectInput.id },
      { ...updateProjectInput },
    );

    return this.getOne(updateProjectInput.id);
  }

  public async remove(id: string) {
    await this.projectRepository.delete({ id });
    return id;
  }
}
