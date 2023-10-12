import { forwardRef, Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestResolver } from './test.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from '../../entities/test.entity';
import { TagsModule } from '../tags/tags.module';
import { TestTagsModule } from '../test-tags/test-tags.module';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { TestCaseModule } from '../test-case/test-case.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestEntity]),
    TagsModule,
    TestTagsModule,
    UsersModule,
    ProjectsModule,
    forwardRef(() => TestCaseModule),
  ],
  exports: [TestService],
  providers: [TestService, TestResolver],
})
export class TestModule {}
