import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { OrganizationUserService } from '../organization-user/organization-user.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private organizationUserService: OrganizationUserService,
  ) {}

  public async createUser(userInput: CreateUserInput) {
    return await this.userRepository.save({ ...userInput });
  }

  public async getOneUser(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  public async getOrganizationUsers(userId: string) {
    return await this.organizationUserService.getByUserId(userId);
  }

  public async getAllUsers() {
    return await this.userRepository.find();
  }

  public async removeUser(id: string) {
    await this.userRepository.delete({ id });
    return id;
  }

  public async updateUser(updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput },
    );

    console.log('user.', user);
    return await this.getOneUser(updateUserInput.id);
  }
}
