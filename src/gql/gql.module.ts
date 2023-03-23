import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { gqlLoaders } from './gql-loaders';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
      context: ({ req, res }) => ({
        req,
        res,
        ...gqlLoaders,
      }),
    }),
  ],
})
export class GqlModule {}
