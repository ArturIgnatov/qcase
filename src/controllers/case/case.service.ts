import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseEntity } from '../../entities/case.entity';
import { Repository } from 'typeorm';
import { CreateCaseInput } from './inputs/create-case.input';
import { UpdateCaseInput } from './inputs/update-case.input';
import { CaseFiltersInput } from './inputs/case-filters.input';
import { StepService } from '../step/step.service';
import { CaseTagsService } from '../case-tags/case-tags.service';

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(CaseEntity)
    private readonly caseRepository: Repository<CaseEntity>,
    private readonly stepService: StepService,
    private readonly caseTagsService: CaseTagsService,
  ) {}

  public getOne(id: string) {
    return this.caseRepository.findOneBy({ id });
  }

  public getMany(filters?: CaseFiltersInput) {
    const builder = this.caseRepository.createQueryBuilder('case');

    if (filters?.templateIds) {
      builder.where('case.templateId IN (:...templateIds)', {
        templateIds: [null, ...filters.templateIds],
      });
    }

    return builder.getMany();
  }

  public async create(createCaseInput: CreateCaseInput, createdUserId: string) {
    const { steps, tagIds, ...data } = createCaseInput;

    const createdCase = await this.caseRepository.save({
      ...data,
      createdUserId,
    });

    if (tagIds.length) {
      await this.caseTagsService.createMany(createdCase.id, tagIds);
    }

    if (steps.length) {
      await this.stepService.createManyForCase(steps, createdCase.id);
    }

    return createdCase;
  }

  public async update(updateCaseInput: UpdateCaseInput) {
    await this.caseRepository.update(
      { id: updateCaseInput.id },
      { ...updateCaseInput },
    );

    return this.getOne(updateCaseInput.id);
  }

  public async remove(id: string) {
    await this.caseRepository.delete({ id });
    return id;
  }
}
