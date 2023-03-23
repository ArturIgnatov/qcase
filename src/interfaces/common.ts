import { gqlLoaders } from '../gql/gql-loaders';

type Loaders = typeof gqlLoaders;

export interface MyGQLContext extends Loaders {
  req: any;
  res: any;
}
