import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../../entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './inputs/create-project.input';
import { UpdateProjectInput } from './inputs/update-project.input';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  public async getOne(id: string) {
    return await this.projectRepository.findOneBy({ id });
  }

  public async getMany() {
    return await this.projectRepository.find();
  }

  public async create(createProjectInput: CreateProjectInput) {
    return await this.projectRepository.save({ ...createProjectInput });
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
