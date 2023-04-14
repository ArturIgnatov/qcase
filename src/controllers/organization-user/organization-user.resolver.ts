import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OrganizationUserEntity } from '../../entities/organization-user.entity';
import { UserEntity } from '../../entities/user.entity';
import { DataSource } from 'typeorm';
import { OrganizationEntity } from '../../entities/organization.entity';
import { OrganizationUsersInput } from './inputs/organization-users.input';
import { UserOrganizationsInput } from './inputs/user-organizations.input';
import { OrganizationUserService } from './organization-user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => OrganizationUserEntity)
export class OrganizationUserResolver {
  constructor(
    private readonly organizationUserService: OrganizationUserService,
    private readonly dataSource: DataSource,
  ) {}

  @Query(() => [OrganizationUserEntity])
  private organizationUsers(
    @Args('organizationUsersInput')
    organizationUsersInput: OrganizationUsersInput,
  ) {
    return this.organizationUserService.getByOrganizationId(
      organizationUsersInput.organizationId,
    );
  }

  @Query(() => [OrganizationUserEntity])
  private userOrganizations(
    @Args('userOrganizationsInput')
    userOrganizationsInput: UserOrganizationsInput,
  ) {
    return this.organizationUserService.getByUserId(
      userOrganizationsInput.userId,
    );
  }

  @ResolveField(() => UserEntity)
  private user(@Parent() organizationUser: OrganizationUserEntity) {
    return this.dataSource
      .getRepository(UserEntity)
      .findOneBy({ id: organizationUser.userId });
  }

  @ResolveField(() => OrganizationEntity)
  private organization(@Parent() organizationUser: OrganizationUserEntity) {
    return this.dataSource
      .getRepository(OrganizationEntity)
      .findOneBy({ id: organizationUser.organizationId });
  }
}
