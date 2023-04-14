import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { CaseEntity } from './case.entity';

@ObjectType()
@Entity('steps')
export class StepEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: false })
  caseId: string;

  @ManyToOne(() => CaseEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'caseId' })
  case: CaseEntity;
}
