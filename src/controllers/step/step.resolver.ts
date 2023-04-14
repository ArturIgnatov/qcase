import { Resolver } from '@nestjs/graphql';
import { StepEntity } from '../../entities/st.entity';

@Resolver(() => StepEntity)
export class StepResolver {}
