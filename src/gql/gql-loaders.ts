import { projectLoader } from '../controllers/organizations/projects.loader';
import { casesLoader } from '../controllers/template/cases.loader';

export const gqlLoaders = {
  projectLoader: projectLoader(),
  casesLoader: casesLoader(),
} as const;
