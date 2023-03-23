import * as DataLoader from 'dataloader';
import { dataSource } from '../../database/datasource';
import { ProjectEntity } from '../../entities/project.entity';
import { Utils } from '../../utils/utils';

export const projectLoader = () => {
  return new DataLoader(async (keys: string[]) => {
    const projects = await dataSource
      .getRepository(ProjectEntity)
      .createQueryBuilder('project')
      .where('project.organizationId IN (:...keys)', { keys })
      .getMany();

    const gb = Utils.groupBy(projects, 'organizationId');

    return keys.map((id) => gb[id] ?? []);
  });
};
