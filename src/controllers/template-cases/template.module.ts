import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateResolver } from './template.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from '../../entities/template.entity';
import { UsersModule } from '../users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateEntity]),
    UsersModule,
    OrganizationsModule,
  ],
  exports: [TemplateService],
  providers: [TemplateService, TemplateResolver],
})
export class TemplateModule {}
