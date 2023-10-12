import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TestEntity } from './test.entity';
import { TestCaseStatus } from '../interfaces/test-case-status';
import { CaseEntity } from './case.entity';
import { TestCaseCriticality } from '../interfaces/test-case-criticality';

@ObjectType()
@Entity('test_cases')
export class TestCaseEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => TestCaseStatus, { nullable: true })
  @Column({ nullable: true, enum: TestCaseStatus, default: null })
  status: TestCaseStatus;

  @Field({ nullable: true })
  @Column({ nullable: true, enum: TestCaseCriticality, default: null })
  criticality: TestCaseCriticality;

  @Field()
  @Column({ nullable: false, default: '' })
  actualResult: string;

  @Field(() => ID)
  @Column('uuid', { nullable: false })
  caseId: string;

  @ManyToOne(() => CaseEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'caseId' })
  case: CaseEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: false })
  testId: string;

  @ManyToOne(() => TestEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testId' })
  test: TestEntity;
}
