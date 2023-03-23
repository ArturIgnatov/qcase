import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './controllers/users/users.module';
import { OrganizationsModule } from './controllers/organizations/organizations.module';
import { ProjectsModule } from './controllers/projects/projects.module';
import { AuthModule } from './controllers/auth/auth.module';
import { OrganizationUserModule } from './controllers/organization-user/organization-user.module';
import { TemplateModule } from './controllers/template-cases/template.module';
import { GqlModule } from './gql/gql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GqlModule,
    DatabaseModule,
    UsersModule,
    OrganizationsModule,
    OrganizationUserModule,
    ProjectsModule,
    AuthModule,
    TemplateModule,
    GqlModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
