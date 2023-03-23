import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationUserEntity } from '../../entities/organization-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationUserService {
  constructor(
    @InjectRepository(OrganizationUserEntity)
    public readonly organizationUserRepository: Repository<OrganizationUserEntity>,
  ) {}

  public async getByUserId(userId: string) {
    return await this.organizationUserRepository.find({ where: { userId } });
  }

  public async getByOrganizationId(organizationId: string) {
    return await this.organizationUserRepository.find({
      where: { organizationId },
    });
  }
}
