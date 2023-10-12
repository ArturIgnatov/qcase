import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestTagsEntity } from '../../entities/test-tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestTagsService {
  constructor(
    @InjectRepository(TestTagsEntity)
    public readonly testTagsRepository: Repository<TestTagsEntity>,
  ) {}

  public getByTagId(tagId: string) {
    return this.testTagsRepository.find({ where: { tagId } });
  }

  public getByTestId(testId: string) {
    return this.testTagsRepository.find({ where: { testId } });
  }

  public async createMany(testId: string, tagIds: string[]) {
    await this.testTagsRepository.save(
      tagIds.map((tagId) => ({ tagId, testId })),
    );
  }
}
