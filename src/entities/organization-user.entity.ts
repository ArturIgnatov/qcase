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
import { UserEntity } from './user.entity';
import { OrganizationEntity } from './organization.entity';

@ObjectType()
@Entity('organization_user')
@Index(['userId', 'organizationId'], { unique: true })
export class OrganizationUserEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Field(() => ID)
  @Index()
  @Column('uuid', { nullable: false })
  organizationId: string;

  @ManyToOne(() => OrganizationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;
}
