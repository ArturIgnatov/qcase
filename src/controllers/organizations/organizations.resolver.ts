import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OrganizationsService } from './organizations.service';
import { OrganizationEntity } from '../../entities/organization.entity';
import { CreateOrganizationInput } from './inputs/create-organization.input';
import { UpdateOrganizationInput } from './inputs/update-organization.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/user.decorator';
import { RequestUser } from '../../interfaces/request-user';
import { OrganizationUserEntity } from '../../entities/organization-user.entity';
import { ProjectEntity } from '../../entities/project.entity';
import { OrganizationFiltersInput } from './inputs/organization-filters.input';
import { MyGQLContext } from '../../interfaces/common';

@UseGuards(JwtAuthGuard)
@Resolver(() => OrganizationEntity)
export class OrganizationsResolver {
  constructor(private organizationService: OrganizationsService) {}

  @Query(() => OrganizationEntity)
  private organization(@Args('id') id: string) {
    return this.organizationService.getOne(id);
  }

  @Query(() => [OrganizationEntity])
  private organizations(
    @Args('filters', { nullable: true }) filters?: OrganizationFiltersInput,
  ) {
    return this.organizationService.getMany(filters);
  }

  @ResolveField(() => [OrganizationUserEntity])
  public organizationUsers(@Parent() organization: OrganizationEntity) {
    return this.organizationService.getOrganizationUsers(organization.id);
  }

  @ResolveField(() => [ProjectEntity])
  private projects(
    @Parent() organization: OrganizationEntity,
    @Context() ctx: MyGQLContext,
  ) {
    return ctx.projectLoader.load(organization.id);
  }

  @Mutation(() => OrganizationEntity)
  private createOrganization(
    @Args('createOrgInput')
    createOrgInput: CreateOrganizationInput,
    @CurrentUser() user: RequestUser,
  ) {
    return this.organizationService.create(createOrgInput, user.id);
  }

  @Mutation(() => OrganizationEntity)
  private updateOrganization(
    @Args('updateOrgInput') updateOrgInput: UpdateOrganizationInput,
  ) {
    return this.organizationService.update(updateOrgInput);
  }

  @Mutation(() => String)
  private removeOrganization(@Args('id') id: string) {
    return this.organizationService.remove(id);
  }
}
