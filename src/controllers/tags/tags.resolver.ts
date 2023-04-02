import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { TagEntity } from '../../entities/tag.entity';
import { TagFiltersInput } from './inputs/tag-filters.input';
import { CreateTagInput } from './inputs/create-tag.input';
import { CurrentUser } from '../../decorators/user.decorator';
import { RequestUser } from '../../interfaces/request-user';
import { UpdateTagInput } from './inputs/update-tag.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => TagEntity)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Query(() => TagEntity)
  private tag(@Args('id') id: string) {
    return this.tagsService.getOne(id);
  }

  @Query(() => [TagEntity])
  private tags(@Args('filters') filters?: TagFiltersInput) {
    return this.tagsService.getMany(filters);
  }

  @Mutation(() => TagEntity)
  private createTag(
    @Args('createTagInput') createTagInput: CreateTagInput,
    @CurrentUser() user: RequestUser,
  ) {
    return this.tagsService.create(createTagInput, user.id);
  }

  @Mutation(() => TagEntity)
  private updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return this.tagsService.update(updateTagInput);
  }

  @Mutation(() => String)
  private removeTag(@Args('id') id: string) {
    return this.tagsService.remove(id);
  }
}
