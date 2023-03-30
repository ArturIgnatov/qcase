import * as DataLoader from 'dataloader';
import { dataSource } from '../../database/datasource';
import { Utils } from '../../utils/utils';
import { CaseEntity } from '../../entities/case.entity';

export const casesLoader = () => {
  return new DataLoader(async (keys: string[]) => {
    const cases = await dataSource
      .getRepository(CaseEntity)
      .createQueryBuilder('case')
      .where('case.templateId IN (:...keys)', { keys })
      .getMany();

    const gb = Utils.groupBy(cases, 'templateId');

    return keys.map((id) => gb[id] ?? []);
  });
};
