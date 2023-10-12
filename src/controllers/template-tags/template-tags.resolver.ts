import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TemplateTagsService } from './template-tags.service';
import { DataSource } from 'typeorm';
import { TemplateEntity } from '../../entities/template.entity';
import { TemplateTagsEntity } from '../../entities/template-tags.entity';
import { TagEntity } from '../../entities/tag.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => TemplateTagsEntity)
export class TemplateTagsResolver {
  constructor(
    private readonly templateTagsService: TemplateTagsService,
    private readonly dataSource: DataSource,
  ) {}
  @ResolveField(() => TemplateEntity)
  private template(@Parent() templateTag: TemplateTagsEntity) {
    return this.dataSource
      .getRepository(TemplateEntity)
      .findOneBy({ id: templateTag.templateId });
  }

  @ResolveField(() => TagEntity)
  private tag(@Parent() templateTag: TemplateTagsEntity) {
    return this.dataSource
      .getRepository(TagEntity)
      .findOneBy({ id: templateTag.tagId });
  }
}
