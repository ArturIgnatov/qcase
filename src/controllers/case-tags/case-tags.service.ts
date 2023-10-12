import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseTagsEntity } from '../../entities/case-tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CaseTagsService {
  constructor(
    @InjectRepository(CaseTagsEntity)
    public readonly caseTagsRepository: Repository<CaseTagsEntity>,
  ) {}

  public getByTagId(tagId: string) {
    return this.caseTagsRepository.find({ where: { tagId } });
  }

  public getByCaseId(caseId: string) {
    return this.caseTagsRepository.find({ where: { caseId } });
  }

  public async createMany(caseId: string, tagIds: string[]) {
    await this.caseTagsRepository.save(
      tagIds.map((tagId) => ({ tagId, caseId })),
    );
  }
}
