import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CaseTagsService } from './case-tags.service';
import { DataSource } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CaseTagsEntity } from '../../entities/case-tags.entity';
import { TagEntity } from '../../entities/tag.entity';
import { CaseEntity } from '../../entities/case.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => CaseTagsEntity)
export class CaseTagsResolver {
  constructor(
    private readonly caseTagsService: CaseTagsService,
    private readonly dataSource: DataSource,
  ) {}

  @ResolveField(() => CaseEntity)
  private case(@Parent() caseTag: CaseTagsEntity) {
    return this.dataSource
      .getRepository(CaseEntity)
      .findOneBy({ id: caseTag.caseId });
  }

  @ResolveField(() => TagEntity)
  private tag(@Parent() caseTag: CaseTagsEntity) {
    return this.dataSource
      .getRepository(TagEntity)
      .findOneBy({ id: caseTag.tagId });
  }
}
