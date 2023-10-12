import { ConflictException, Injectable, Logger } from '@nestjs/common';
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
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class UserInvitesService {
  private readonly logger = new Logger(UserInvitesService.name);

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
      const userOrganizations =
        await this.organizationService.organizationUserService.getByUserId(
          user.id,
        );

      this.logger.log('isAlreadyExists', invite);

      const isAlreadyExists = userOrganizations.some(
        (org) => org.organizationId === data.organizationId,
      );

      if (isAlreadyExists) {
        throw new ConflictException(Errors.USER_ALREADY_EXIST_IN_ORGANIZATION);
      }

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

  // @Cron(CronExpression.EVERY_DAY_AT_3AM)
  @Cron(CronExpression.EVERY_10_SECONDS)
  private handleRemoveInvites() {
    this.logger.log('Clear invite codes');

    const currentDate = moment().subtract(24, 'hours').toDate();

    this.userInviteRepository
      .createQueryBuilder()
      .delete()
      .where('createdAt <= :currentDate', { currentDate })
      .execute();
  }
}
