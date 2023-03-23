import { forwardRef, Module } from '@nestjs/common';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../entities/organization.entity';
import { OrganizationUserModule } from '../organization-user/organization-user.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationEntity]),
    OrganizationUserModule,
    forwardRef(() => ProjectsModule),
  ],
  exports: [OrganizationsService],
  providers: [OrganizationsResolver, OrganizationsService],
})
export class OrganizationsModule {}
