import { forwardRef, Module } from '@nestjs/common';
import { TestCaseService } from './test-case.service';
import { TestCaseResolver } from './test-case.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestCaseEntity } from '../../entities/test-case.entity';
import { TestModule } from '../test/test.module';
import { CaseModule } from '../case/case.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestCaseEntity]),
    forwardRef(() => TestModule),
    CaseModule,
  ],
  exports: [TestCaseService],
  providers: [TestCaseService, TestCaseResolver],
})
export class TestCaseModule {}
