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

@ObjectType()
@Entity()
export class TagEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  title: string;

  @Field()
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

  @ManyToOne(() => TemplateEntity, { nullable: false, onDelete: 'CASCADE' })
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
