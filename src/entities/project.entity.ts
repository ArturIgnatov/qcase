import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { JoinColumn } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { ProjectStatus } from '../interfaces/project-status';
import { UserEntity } from './user.entity';
import { TemplateEntity } from './template.entity';
import { TestEntity } from './test.entity';

@ObjectType()
@Entity('projects')
export class ProjectEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: '' })
  description: string;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: true })
  createdUserId: string;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdUserId' })
  user: UserEntity;

  @Field(() => ProjectStatus)
  @Column({ enum: ProjectStatus, default: ProjectStatus.ACTIVE })
  status: string;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: false })
  organizationId: string;

  @ManyToOne(() => OrganizationEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @OneToMany(() => TemplateEntity, (template) => template.projectId)
  templates: TemplateEntity[];

  @OneToMany(() => TestEntity, (test) => test.projectId)
  tests: TestEntity[];
}
