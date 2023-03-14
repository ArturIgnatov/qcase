import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { OrganizationEntity } from './organization.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
import { UserRole } from '../interfaces/role';

@ObjectType()
@Entity('users')
export class UserEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  fname: string;

  @Field()
  @Column({ default: '' })
  lname: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Field(() => UserRole)
  @Column({ default: UserRole.USER, enum: UserRole })
  role: UserRole;

  @Field(() => [OrganizationEntity], { defaultValue: [] })
  @ManyToMany(() => OrganizationEntity, (organization) => organization.users)
  @JoinTable()
  organizations: OrganizationEntity[];

  @OneToMany(() => RefreshTokenEntity, (token) => token.user)
  refreshes: RefreshTokenEntity[];
}
