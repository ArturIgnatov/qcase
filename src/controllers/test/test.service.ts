import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TestEntity } from '../../entities/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TestFiltersInput } from './inputs/test-filters.input';
import { CreateTestInput } from './inputs/create-test.input';
import { TagsService } from '../tags/tags.service';
import { TestTagsService } from '../test-tags/test-tags.service';
import { TestCaseService } from '../test-case/test-case.service';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity)
    public readonly testRepository: Repository<TestEntity>,
    private readonly tagService: TagsService,
    private readonly testTagsService: TestTagsService,
    private readonly testCaseService: TestCaseService,
  ) {}
  public getOne(id: string) {
    return this.testRepository.findOneBy({ id });
  }

  public getMany(filters: TestFiltersInput) {
    const builder = this.testRepository.createQueryBuilder('test');

    if (filters?.organizationId) {
      builder.where('test.organizationId = :organizationId', {
        organizationId: filters.organizationId,
      });
    }

    return builder.getMany();
  }

  public async create(createTestInput: CreateTestInput) {
    const { tagIds, caseIds, ...testData } = createTestInput;

    const test = await this.testRepository.save({ ...testData });

    if (tagIds.length) {
      await this.testTagsService.createMany(test.id, tagIds);
    }

    if (caseIds.length) {
      await this.testCaseService.createMany(test.id, caseIds);
    }

    return test;
  }

  public update() {
    // this.testRepository.update({});
    // return this.getOne();
  }

  public async delete(id: string) {
    await this.testRepository.delete({ id });
    return id;
  }
}
