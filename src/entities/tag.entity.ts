import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrganizationEntity } from './organization.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';
import { TestTagsEntity } from './test-tags.entity';
import { CaseTagsEntity } from './case-tags.entity';
import { TemplateTagsEntity } from './template-tags.entity';

@ObjectType()
@Entity('tags')
export class TagEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  color: string;

  @Field(() => ID, { nullable: true })
  @Index()
  @Column('uuid', { nullable: true })
  createdUserId: string;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdUserId' })
  user: UserEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: false })
  organizationId: string;

  @ManyToOne(() => OrganizationEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @ManyToOne(() => TemplateTagsEntity, (templateTags) => templateTags.tag)
  templateTags: TemplateTagsEntity[];

  @ManyToOne(() => CaseTagsEntity, (caseTags) => caseTags.tag)
  caseTags: CaseTagsEntity[];

  @ManyToOne(() => TestTagsEntity, (testTags) => testTags.tag)
  testTags: TestTagsEntity[];
}
