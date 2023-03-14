import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrganizationsService } from './organizations.service';
import { OrganizationEntity } from '../../entities/organization.entity';
import { CreateOrganizationInput } from './inputs/create-organization.input';
import { UpdateOrganizationInput } from './inputs/update-organization.input';

@Resolver()
export class OrganizationsResolver {
  constructor(private organizationService: OrganizationsService) {}

  @Query(() => OrganizationEntity)
  private getOrganization(@Args('id') id: string) {
    return this.organizationService.getOne(id);
  }

  @Query(() => [OrganizationEntity])
  private getOrganizations() {
    return this.organizationService.getMany();
  }

  @Mutation(() => OrganizationEntity)
  private createOrganization(
    @Args('createOrgInput')
    createOrgInput: CreateOrganizationInput,
  ) {
    return this.organizationService.create(createOrgInput);
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
