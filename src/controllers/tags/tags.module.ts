import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '../../entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  exports: [TagsService],
  providers: [TagsService, TagsResolver],
})
export class TagsModule {}
