import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { UsersResolver } from './users.resolver';
import { OrganizationUserModule } from '../organization-user/organization-user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), OrganizationUserModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
