import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StepEntity } from '../../entities/st.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(StepEntity)
    private readonly stepRepository: Repository<StepEntity>,
  ) {}
  public async createManyForCase(titles: string[], caseId: string) {
    await this.stepRepository.save(
      titles.map((el) => {
        const step = new StepEntity();
        step.title = el;
        step.caseId = caseId;
        return step;
      }),
    );
  }
}
