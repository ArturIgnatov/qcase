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
import { TemplateEntity } from './template.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';
import { StepEntity } from './st.entity';
import { CaseImportance } from '../interfaces/case-importance';
import { TestCaseEntity } from './test-case.entity';
import { CaseTagsEntity } from './case-tags.entity';

@ObjectType()
@Entity('cases')
export class CaseEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: '' })
  description: string;

  @Field(() => CaseImportance)
  @Column({ default: CaseImportance.LOW, enum: CaseImportance })
  importance: CaseImportance;

  @Field()
  @Column({ default: '' })
  precondition: string;

  @Field()
  @Column({ default: '' })
  expectedResult: string;

  @OneToMany(() => StepEntity, (s) => s.caseId)
  steps: StepEntity[];

  @OneToMany(() => TestCaseEntity, (testCase) => testCase.caseId)
  testCases: TestCaseEntity[];

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: true })
  createdUserId: string;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdUserId' })
  user: UserEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: false })
  templateId: string;

  @ManyToOne(() => TemplateEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'templateId' })
  template: TemplateEntity;

  @OneToMany(() => CaseTagsEntity, (tag) => tag.case)
  caseTags: CaseTagsEntity[];
}
