import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from '../../entities/template.entity';
import { Repository } from 'typeorm';
import { CreateTemplateInput } from './inputs/create-template.input';
import { UpdateTemplateInput } from './inputs/update-template.input';
import { TemplateFiltersInput } from './inputs/template-filters.input';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
    private readonly tagsService: TagsService,
  ) {}

  public getOne(id: string) {
    return this.templateRepository.findOneBy({ id });
  }

  public getMany(filters?: TemplateFiltersInput | undefined) {
    const builder = this.templateRepository.createQueryBuilder('template');

    if (filters?.organizationId) {
      builder.where('template.organizationId = :organizationId', {
        organizationId: filters.organizationId,
      });
    }

    return builder.getMany();
  }

  public async create(
    createTemplateInput: CreateTemplateInput,
    createdUserId: string,
  ) {
    const { tagIds, ...templateData } = createTemplateInput;
    const template = await this.templateRepository.save({
      ...templateData,
      createdUserId,
    });

    if (tagIds?.length) {
      await this.tagsService.relationManyBy('templateId', template.id, tagIds);
    }

    return template;
  }

  public async update(updateTemplateInput: UpdateTemplateInput) {
    await this.templateRepository.update(
      { id: updateTemplateInput.id },
      { ...updateTemplateInput },
    );

    return this.getOne(updateTemplateInput.id);
  }

  public async remove(id: string) {
    await this.templateRepository.delete({ id });
    return id;
  }
}
