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
import { TestEntity } from './test.entity';

@ObjectType()
@Entity('test_tags')
@Index(['testId', 'tagId'], { unique: true })
export class TestTagsEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ID)
  @Index()
  @Column('uuid')
  testId: string;

  @ManyToOne(() => TestEntity, (test) => test.testTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testId' })
  test: TestEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid')
  tagId: string;

  @ManyToOne(() => TagEntity, (tag) => tag.testTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tagId' })
  tag: TagEntity;
}
