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
import { TestCaseEntity } from './test-case.entity';
import { TestStatus } from '../interfaces/test-status';
import { UserEntity } from './user.entity';
import { OrganizationEntity } from './organization.entity';
import { TestTagsEntity } from './test-tags.entity';
import { ProjectEntity } from './project.entity';

@ObjectType()
@Entity('tests')
export class TestEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: '' })
  description: string;

  @Field(() => TestStatus)
  @Column({ default: TestStatus.WAITING, enum: TestStatus })
  status: TestStatus;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: false })
  organizationId: string;

  @ManyToOne(() => OrganizationEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: true, default: null })
  projectId: string | null;

  @ManyToOne(() => ProjectEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'projectId' })
  project: ProjectEntity | null;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: true })
  createdUserId: string;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdUserId' })
  user: UserEntity;

  @Field(() => ID, { nullable: false, description: 'User ID responsible' })
  @Index()
  @Column('uuid', { nullable: true })
  responsibleId: string;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'responsibleId' })
  responsible: UserEntity;

  @Field(() => ID, { description: 'User ID executor' })
  @Index()
  @Column('uuid', { nullable: true })
  executorId: string;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'executorId' })
  executor: UserEntity;

  @OneToMany(() => TestCaseEntity, (testCase) => testCase.testId)
  testCases: TestCaseEntity[];

  @OneToMany(() => TestTagsEntity, (testTags) => testTags.test)
  testTags: TestTagsEntity[];
}
