import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { Field, ID } from '@nestjs/graphql';

@Entity('refresh_token')
export class RefreshTokenEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;

  @Index()
  @Column('uuid', { nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
