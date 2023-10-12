import { Module } from '@nestjs/common';
import { CaseTagsService } from './case-tags.service';
import { CaseTagsResolver } from './case-tags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseTagsEntity } from '../../entities/case-tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaseTagsEntity])],
  exports: [CaseTagsService],
  providers: [CaseTagsService, CaseTagsResolver],
})
export class CaseTagsModule {}
