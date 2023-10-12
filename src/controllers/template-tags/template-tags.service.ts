import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateTagsEntity } from '../../entities/template-tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TemplateTagsService {
  constructor(
    @InjectRepository(TemplateTagsEntity)
    public readonly templateTagsRepository: Repository<TemplateTagsEntity>,
  ) {}

  public getByTagId(tagId: string) {
    return this.templateTagsRepository.find({ where: { tagId } });
  }

  public getByTemplateId(templateId: string) {
    return this.templateTagsRepository.find({ where: { templateId } });
  }

  public async createMany(templateId: string, tagIds: string[]) {
    await this.templateTagsRepository.save(
      tagIds.map((tagId) => ({ tagId, templateId })),
    );
  }
}
