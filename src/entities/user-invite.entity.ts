import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrganizationEntity } from './organization.entity';

@ObjectType()
@Entity('user_invites')
export class UserInviteEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column()
  email: string;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: false })
  organizationId: string;

  @ManyToOne(() => OrganizationEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;
}
