import { BaseEntity } from './base.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagEntity } from './tag.entity';
import { CaseEntity } from './case.entity';

@ObjectType()
@Entity('case_tags')
@Index(['caseId', 'tagId'], { unique: true })
export class CaseTagsEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ID)
  @Index()
  @Column('uuid')
  caseId: string;

  @ManyToOne(() => CaseEntity, (_case) => _case.caseTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'caseId' })
  case: CaseEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid')
  tagId: string;

  @ManyToOne(() => TagEntity, (tag) => tag.caseTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tagId' })
  tag: TagEntity;
}
