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
import { TemplateEntity } from './template.entity';
import { TagEntity } from './tag.entity';

@ObjectType()
@Entity('template_tags')
@Index(['templateId', 'tagId'], { unique: true })
export class TemplateTagsEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ID)
  @Index()
  @Column('uuid')
  templateId: string;

  @ManyToOne(() => TemplateEntity, (template) => template.templateTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'templateId' })
  template: TemplateEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid')
  tagId: string;

  @ManyToOne(() => TagEntity, (tag) => tag.templateTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tagId' })
  tag: TagEntity;
}
