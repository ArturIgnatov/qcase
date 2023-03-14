import {
  CreateDateColumn,
  BaseEntity as TypeOrmBaseEntity,
  UpdateDateColumn,
} from 'typeorm';
import { Field } from '@nestjs/graphql';

export class BaseEntity extends TypeOrmBaseEntity {
  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;
}
