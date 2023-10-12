import { Module } from '@nestjs/common';
import { TestTagsService } from './test-tags.service';
import { TestTagsResolver } from './test-tags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestTagsEntity } from '../../entities/test-tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestTagsEntity])],
  exports: [TestTagsService],
  providers: [TestTagsService, TestTagsResolver],
})
export class TestTagsModule {}
