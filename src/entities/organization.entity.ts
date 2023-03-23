import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { ProjectEntity } from './project.entity';
import { OrganizationStatus } from '../interfaces/organization-status';
import { OrganizationUserEntity } from './organization-user.entity';
import { UserEntity } from './user.entity';

@ObjectType()
@Entity('organizations')
export class OrganizationEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => OrganizationStatus)
  @Column({ enum: OrganizationStatus, default: OrganizationStatus.ACTIVE })
  status: string;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: true })
  createdUserId: string;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdUserId' })
  user: UserEntity;

  @OneToMany(
    () => OrganizationUserEntity,
    (organizationUser) => organizationUser.organization,
  )
  organizationUsers: OrganizationUserEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.organization)
  projects: ProjectEntity[];
}
