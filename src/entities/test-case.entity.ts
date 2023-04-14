import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TestEntity } from './test.entity';
import { TestCaseStatus } from '../interfaces/test-case-status';

@ObjectType()
@Entity('test_cases')
export class TestCaseEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => TestCaseStatus)
  @Column({ nullable: true, enum: TestCaseStatus })
  status: TestCaseStatus;

  @Field()
  @Column({ nullable: false, default: '' })
  actualResult: string;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: false })
  testId: string;

  @ManyToOne(() => TestEntity, { nullable: false, onDelete: 'CASCADE' })
  test: TestEntity;
}
