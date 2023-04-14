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
  @Column('uuid', { nullable: true })
  createdUserId: string;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdUserId' })
  user: UserEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: true })
  responsibleId: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'responsibleId' })
  responsible: UserEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: true })
  executorId: string;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'executorId' })
  executor: UserEntity;

  @OneToMany(() => TestCaseEntity, (testCase) => testCase.testId)
  testCases: TestCaseEntity[];
}
