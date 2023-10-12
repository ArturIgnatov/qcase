import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateResolver } from './template.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from '../../entities/template.entity';
import { UsersModule } from '../users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { ProjectsModule } from '../projects/projects.module';
import { TagsModule } from '../tags/tags.module';
import { TemplateTagsModule } from '../template-tags/template-tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateEntity]),
    UsersModule,
    OrganizationsModule,
    ProjectsModule,
    TagsModule,
    TemplateTagsModule,
  ],
  exports: [TemplateService],
  providers: [TemplateService, TemplateResolver],
})
export class TemplateModule {}
