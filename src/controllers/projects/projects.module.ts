import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../../entities/project.entity';
import { OrganizationUserModule } from '../organization-user/organization-user.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    OrganizationUserModule,
    forwardRef(() => OrganizationsModule),
  ],
  exports: [ProjectsService],
  providers: [ProjectsService, ProjectsResolver],
})
export class ProjectsModule {}
