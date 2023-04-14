import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../entities/organization.entity';
import { Repository } from 'typeorm';
import { CreateOrganizationInput } from './inputs/create-organization.input';
import { UpdateOrganizationInput } from './inputs/update-organization.input';
import { OrganizationUserService } from '../organization-user/organization-user.service';
import { OrganizationFiltersInput } from './inputs/organization-filters.input';
import { SelectedFieldsResult } from 'nestjs-graphql-tools';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly orgRepository: Repository<OrganizationEntity>,
    private readonly organizationUserService: OrganizationUserService,
  ) {}

  public getOne(id: string) {
    return this.orgRepository.findOneBy({ id });
  }

  public getByOrganizationIn(id: string) {
    return this.orgRepository.findOneBy({ id });
  }

  public getMany(
    fields: SelectedFieldsResult,
    filters?: OrganizationFiltersInput | undefined,
  ) {
    const builder = this.orgRepository
      .createQueryBuilder('organization')
      .select(fields.fieldsData.fieldsString);

    if (filters?.userId) {
      builder
        .leftJoinAndSelect(
          'organization.organizationUsers',
          'organizationUsers',
        )
        .where('organizationUsers.userId = :userId', {
          userId: filters.userId,
        });
    }

    return builder.getMany();
  }

  public getOrganizationUsers(organizationId: string) {
    return this.organizationUserService.getByOrganizationId(organizationId);
  }

  public async create(
    createOrgInput: CreateOrganizationInput,
    createdUserId: string,
  ) {
    const organization = await this.orgRepository.save({
      ...createOrgInput,
      createdUserId,
    });

    await this.organizationUserService.organizationUserRepository.save({
      userId: createdUserId,
      organizationId: organization.id,
    });

    return organization;
  }

  public async update(updateOrgInput: UpdateOrganizationInput) {
    await this.orgRepository.update(
      { id: updateOrgInput.id },
      { ...updateOrgInput },
    );
    return this.getOne(updateOrgInput.id);
  }

  public async remove(id: string) {
    await this.orgRepository.delete({ id });
    return id;
  }
}
