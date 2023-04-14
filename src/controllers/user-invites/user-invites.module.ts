import { Module } from '@nestjs/common';
import { UserInvitesService } from './user-invites.service';
import { UserInvitesResolver } from './user-invites.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInviteEntity } from '../../entities/user-invite.entity';
import { UsersModule } from '../users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInviteEntity]),
    UsersModule,
    OrganizationsModule,
  ],
  providers: [UserInvitesService, UserInvitesResolver],
  exports: [UserInvitesService],
})
export class UserInvitesModule {}
