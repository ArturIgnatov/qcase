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
import { OrganizationEntity } from './organization.entity';
import { CaseEntity } from './case.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';
import { TagEntity } from './tag.entity';
import { ProjectEntity } from './project.entity';

@ObjectType()
@Entity('templates')
export class TemplateEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: '' })
  description: string;

  @Field(() => ID, { nullable: true })
  @Index()
  @Column('uuid', { nullable: true })
  createdUserId: string | null;

  @Field(() => ID, { nullable: true })
  @Index()
  @Column('uuid', { nullable: true, default: null })
  projectId: string | null;

  @ManyToOne(() => ProjectEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'projectId' })
  project: ProjectEntity | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdUserId' })
  user: UserEntity | null;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: false })
  organizationId: string;

  @ManyToOne(() => OrganizationEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @OneToMany(() => CaseEntity, (cas) => cas.templateId)
  cases: CaseEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.templateId)
  tags: TagEntity[];
}
