import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TagEntity } from '../../entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagInput } from './inputs/create-tag.input';
import { UpdateTagInput } from './inputs/update-tag.input';
import { TagFiltersInput } from './inputs/tag-filters.input';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagsRepository: Repository<TagEntity>,
  ) {}

  public getOne(id: string) {
    return this.tagsRepository.findOneBy({ id });
  }

  public getMany(filters?: TagFiltersInput) {
    const builder = this.tagsRepository.createQueryBuilder('tag');

    if (filters?.organizationId) {
      builder.where('tag.organizationId = :organizationId', {
        organizationId: filters.organizationId,
      });
    }

    if (filters?.templateId) {
      builder.where('tag.templateId = :templateId', {
        templateId: filters.templateId,
      });
    }

    if (filters?.caseId) {
      builder.where('tag.caseId = :caseId', {
        caseId: filters.caseId,
      });
    }

    return builder.getMany();
  }

  public create(createTagInput: CreateTagInput, createdUserId: string) {
    return this.tagsRepository.save({ ...createTagInput, createdUserId });
  }

  public async update(updateCaseInput: UpdateTagInput) {
    await this.tagsRepository.update(
      { id: updateCaseInput.id },
      { ...updateCaseInput },
    );

    return this.getOne(updateCaseInput.id);
  }

  public async remove(id: string) {
    await this.tagsRepository.delete({ id });
    return id;
  }
}
