import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseResolver } from './case.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseEntity } from '../../entities/case.entity';
import { UsersModule } from '../users/users.module';
import { TagsModule } from '../tags/tags.module';
import { StepModule } from '../step/step.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CaseEntity]),
    UsersModule,
    TagsModule,
    StepModule,
  ],
  exports: [CaseService],
  providers: [CaseService, CaseResolver],
})
export class CaseModule {}
