import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
import { UserRole } from '../interfaces/role';
import { OrganizationUserEntity } from './organization-user.entity';
import { OrganizationEntity } from './organization.entity';
import { CaseEntity } from './case.entity';
import { TemplateEntity } from './template.entity';

@ObjectType()
@Entity('users')
export class UserEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  fname: string;

  @Field()
  @Column({ default: '' })
  lname: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Field(() => UserRole)
  @Column({ default: UserRole.USER, enum: UserRole })
  role: UserRole;

  @OneToMany(
    () => OrganizationUserEntity,
    (organizationUser) => organizationUser.user,
  )
  organizationUsers: OrganizationUserEntity[];

  @OneToMany(() => OrganizationEntity, (orientation) => orientation.user)
  organizations: OrganizationEntity[];

  @OneToMany(() => TemplateEntity, (tenplate) => tenplate.user)
  templates: TemplateEntity[];

  @OneToMany(() => CaseEntity, (cas) => cas.user)
  cases: CaseEntity[];

  @OneToMany(() => RefreshTokenEntity, (token) => token.user)
  refreshes: RefreshTokenEntity[];
}
