import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInviteEntity } from '../../entities/user-invite.entity';
import { Repository } from 'typeorm';
import { CreateUserInviteInput } from './inputs/create-user-invite.input';
import { UsersService } from '../users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import {
  existingUserInviteTemplate,
  newUserInviteTemplate,
} from '../../mailer/templates/platform-invite.template';
import { Utils } from '../../utils/utils';
import { OrganizationsService } from '../organizations/organizations.service';
import { Errors } from '../../interfaces/errors';
import { UserInvitesInput } from './inputs/user-invites.input';

@Injectable()
export class UserInvitesService {
  constructor(
    @InjectRepository(UserInviteEntity)
    private readonly userInviteRepository: Repository<UserInviteEntity>,
    private readonly userService: UsersService,
    private readonly mailerService: MailerService,
    private readonly organizationService: OrganizationsService,
  ) {}

  public getMany(filters?: UserInvitesInput) {
    const builder = this.userInviteRepository.createQueryBuilder('invite');

    if (filters?.organizationId) {
      builder.where('invite.organizationId = :organizationId', {
        organizationId: filters.organizationId,
      });
    }

    return builder.getMany();
  }

  public async createInvite(data: CreateUserInviteInput) {
    const invite = await this.userInviteRepository.findOneBy({
      email: data.email,
    });

    if (invite) {
      throw new ConflictException(Errors.INVITE_ALREADY_EXIST);
    }

    const user = await this.userService.userRepository.findOneBy({
      email: data.email,
    });

    const organization = await this.organizationService.getByOrganizationIn(
      data.organizationId,
    );

    const code = Utils.generateCode(32);

    if (user) {
      await this.mailerService.sendMail({
        from: 'QCase <q.case.service@gmail.com>',
        to: `${data.email}`,
        subject: 'Platform Invitation',
        html: existingUserInviteTemplate(user.fname, organization.name, code),
      });
    } else {
      await this.mailerService.sendMail({
        from: 'QCase <q.case.service@gmail.com>',
        to: `${data.email}`,
        subject: 'Platform Invitation',
        html: newUserInviteTemplate(organization.name, code),
      });
    }

    return this.userInviteRepository.save({ ...data, code });
  }
}
