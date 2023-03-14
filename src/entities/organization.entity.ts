import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { ProjectEntity } from './project.entity';

@ObjectType()
@Entity('organizations')
export class OrganizationEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  status: string;

  @Field(() => ID)
  @Column('uuid', { nullable: false })
  createdUserId: string;

  @Field(() => [UserEntity], { defaultValue: [] })
  @ManyToMany(() => UserEntity, (user) => user.organizations, { cascade: true })
  users: UserEntity[];

  @Field(() => [ProjectEntity], { defaultValue: [] })
  @OneToMany(() => ProjectEntity, (project) => project.organization)
  projects: ProjectEntity[];
}
