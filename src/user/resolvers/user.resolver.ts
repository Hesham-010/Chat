import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { GetUser, GetUsersInput } from '../dto/get-users.filter';
import { PaginatorArgs } from '../../_common/pagination/pagenator.input';
import { UserPagination } from '../user.response';
import { CurrentUser } from 'src/_common/decorators/currentUser';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/_common/guards/authGuard';
import { UpdateUserInput } from '../dto/update-user.input';
import { changePasswordInput } from '../dto/changePassword.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserPagination)
  findAllUsers(
    @Args() usersBoardInput: GetUsersInput,
    @Args() paginate: PaginatorArgs = {},
  ) {
    return this.userService.findAll(usersBoardInput.filter, paginate.paginate);
  }

  @Query(() => User)
  findOneUser(@Args('userId') userId: GetUser) {
    return this.userService.findOne(userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  updateProfile(
    @Args('input') input: UpdateUserInput,
    @CurrentUser() user: User,
  ) {
    return this.userService.updateProfile(input, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  changePassword(
    @Args('input') input: changePasswordInput,
    @CurrentUser() user: User,
  ) {
    return this.userService.changePassword(input, user);
  }
}
