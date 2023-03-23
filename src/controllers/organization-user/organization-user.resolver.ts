import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OrganizationUserEntity } from '../../entities/organization-user.entity';
import { UserEntity } from '../../entities/user.entity';
import { DataSource } from 'typeorm';
import { OrganizationEntity } from '../../entities/organization.entity';

@Resolver(() => OrganizationUserEntity)
export class OrganizationUserResolver {
  constructor(private dataSource: DataSource) {}

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
