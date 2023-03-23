import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from '../../entities/template.entity';
import { Repository } from 'typeorm';
import { CreateTemplateInput } from './inputs/create-template.input';
import { UpdateTemplateInput } from './inputs/update-template.input';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
  ) {}

  public getOne(id: string) {
    return this.templateRepository.findOneBy({ id });
  }

  public getMany(filters?: any) {
    const builder = this.templateRepository.createQueryBuilder('templateCase');

    if (filters?.organizationId) {
      builder
        .leftJoinAndSelect('template.organization', 'organization')
        .where('organization.organizationId = :organizationId', {
          organizationId: filters.organizationId,
        });
    }

    return builder.getMany();
  }

  public create(
    createTemplateInput: CreateTemplateInput,
    createdUserId: string,
  ) {
    return this.templateRepository.save({
      ...createTemplateInput,
      createdUserId,
    });
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
