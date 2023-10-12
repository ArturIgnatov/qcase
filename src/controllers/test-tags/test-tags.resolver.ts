import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TestTagsService } from './test-tags.service';
import { DataSource } from 'typeorm';
import { TestEntity } from '../../entities/test.entity';
import { TestTagsEntity } from '../../entities/test-tags.entity';
import { TagEntity } from '../../entities/tag.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => TestTagsEntity)
export class TestTagsResolver {
  constructor(
    private readonly testTagsService: TestTagsService,
    private readonly dataSource: DataSource,
  ) {}

  @ResolveField(() => TestEntity)
  private test(@Parent() testTag: TestTagsEntity) {
    return this.dataSource
      .getRepository(TestEntity)
      .findOneBy({ id: testTag.testId });
  }

  @ResolveField(() => TagEntity)
  private tag(@Parent() testTag: TestTagsEntity) {
    return this.dataSource
      .getRepository(TagEntity)
      .findOneBy({ id: testTag.tagId });
  }
}
