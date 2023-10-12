import { Module } from '@nestjs/common';
import { TemplateTagsService } from './template-tags.service';
import { TemplateTagsResolver } from './template-tags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateTagsEntity } from '../../entities/template-tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateTagsEntity])],
  exports: [TemplateTagsService],
  providers: [TemplateTagsService, TemplateTagsResolver],
})
export class TemplateTagsModule {}
