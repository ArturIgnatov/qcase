import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TemplateEntity } from '../../entities/template.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { TemplateService } from './template.service';
import { TemplateFiltersInput } from './inputs/template-filters.input';
import { CreateTemplateInput } from './inputs/create-template.input';
import { CurrentUser } from '../../decorators/user.decorator';
import { RequestUser } from '../../interfaces/request-user';
import { UpdateTemplateInput } from './inputs/update-template.input';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../../entities/user.entity';
import { CaseEntity } from '../../entities/case.entity';
import { MyGQLContext } from '../../interfaces/common';
import { OrganizationEntity } from '../../entities/organization.entity';
import { OrganizationsService } from '../organizations/organizations.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => TemplateEntity)
export class TemplateResolver {
  constructor(
    private readonly templateService: TemplateService,
    private readonly userService: UsersService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  @Query(() => TemplateEntity)
  private template(@Args('id') id: string) {
    return this.templateService.getOne(id);
  }

  @Query(() => [TemplateEntity])
  private templates(
    @Args('filters', { nullable: true }) filters?: TemplateFiltersInput,
  ) {
    return this.templateService.getMany(filters);
  }

  @ResolveField(() => UserEntity)
  private user(@Parent() template: TemplateEntity) {
    return this.userService.getOneUser(template.createdUserId);
  }

  @ResolveField(() => [CaseEntity])
  private cases(
    @Parent() template: TemplateEntity,
    @Context() ctx: MyGQLContext,
  ) {
    return ctx.casesLoader.load(template.id);
  }

  @ResolveField(() => OrganizationEntity)
  private organization(@Parent() template: TemplateEntity) {
    return this.organizationsService.getOne(template.organizationId);
  }

  @Mutation(() => TemplateEntity)
  private createTemplate(
    @Args('createTemplateInput') createTemplateInput: CreateTemplateInput,
    @CurrentUser() user: RequestUser,
  ) {
    return this.templateService.create(createTemplateInput, user.id);
  }

  @Mutation(() => TemplateEntity)
  private updateTemplate(
    @Args('updateTemplateInput') updateTemplateInput: UpdateTemplateInput,
  ) {
    return this.templateService.update(updateTemplateInput);
  }

  @Mutation(() => String)
  private removeTemplate(@Args('id') id: string) {
    return this.templateService.remove(id);
  }
}
