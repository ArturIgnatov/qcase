import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TemplateEntity } from './template.entity';
import { CaseEntity } from './case.entity';
import { OrganizationEntity } from './organization.entity';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

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
  organizationId: string;

  @ManyToOne(() => OrganizationEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: true })
  templateId: string;

  @ManyToOne(() => TemplateEntity, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'templateId' })
  template: TemplateEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: true })
  caseId: string;

  @ManyToOne(() => CaseEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'caseId' })
  case: CaseEntity;
}
