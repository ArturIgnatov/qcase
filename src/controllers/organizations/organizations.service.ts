import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../entities/organization.entity';
import { Repository } from 'typeorm';
import { Args } from '@nestjs/graphql';
import { CreateOrganizationInput } from './inputs/create-organization.input';
import { UpdateOrganizationInput } from './inputs/update-organization.input';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private orgRepository: Repository<OrganizationEntity>,
  ) {}

  public getOne(@Args('id') id: string) {
    return this.orgRepository.findOneBy({ id });
  }

  public getMany() {
    return this.orgRepository.find();
  }

  public async create(createOrgInput: CreateOrganizationInput) {
    return await this.orgRepository.save({ ...createOrgInput });
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
  }
}
