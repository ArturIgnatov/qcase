import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestCaseEntity } from '../../entities/test-case.entity';
import { Repository } from 'typeorm';
import { CreateTestCaseInput } from './inputs/create-test-case.input';
import { TestCaseFiltersInput } from './inputs/test-case-filters.input';

@Injectable()
export class TestCaseService {
  constructor(
    @InjectRepository(TestCaseEntity)
    public readonly testCaseRepository: Repository<TestCaseEntity>,
  ) {}

  public getOne(id: string) {
    return this.testCaseRepository.findOneBy({ id });
  }

  public getMany(filters?: TestCaseFiltersInput) {
    const builder = this.testCaseRepository.createQueryBuilder('testCase');

    if (filters?.organizationId) {
      builder.where('testCase.organizationId = :organizationId', {
        organizationId: filters.organizationId,
      });
    }

    if (filters?.testId) {
      builder.where('testCase.testId = :testId', {
        testId: filters.testId,
      });
    }

    return builder.getMany();
  }

  public createOne(data: CreateTestCaseInput) {
    return this.testCaseRepository.save({ ...data });
  }

  public createMany(testId: string, caseIds: string[]) {
    return this.testCaseRepository.save(
      caseIds.map((caseId) => ({ caseId, testId })),
    );
  }
}
