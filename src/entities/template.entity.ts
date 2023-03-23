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
import { OrganizationEntity } from './organization.entity';
import { CaseEntity } from './case.entity';
import { UserEntity } from './user.entity';

@ObjectType()
@Entity()
export class TemplateEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: '' })
  description: string;

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

  @OneToMany(() => CaseEntity, (cas) => cas.template)
  cases: CaseEntity[];
}
