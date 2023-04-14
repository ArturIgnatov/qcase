import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepEntity } from '../../entities/st.entity';
import { StepResolver } from './step.resolver';
import { StepService } from './step.service';

@Module({
  imports: [TypeOrmModule.forFeature([StepEntity])],
  providers: [StepResolver, StepService],
  exports: [StepService],
})
export class StepModule {}
