import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { UpdateUserInput } from '../dto/update-user.input';
import { UUID } from 'crypto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/_common/guards/authGuard';
import { CreateUserInput } from '../dto/create-user.input';
import { CurrentUser } from 'src/_common/decorators/currentUser';
import { AddSocialAcountInput } from '../dto/addSocialAcount.input';

@UseGuards(AuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User])
  findAllUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  findOneUser(@Args('id') id: UUID) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => String)
  removeUser(@Args('id') id: UUID) {
    return this.userService.remove(id);
  }

  // @Mutation(() => String)
  // disconnectSocialAcount(
  //   @Args('addSocialAcountInput') addSocialAcountInput: AddSocialAcountInput,
  //   @CurrentUser() userId: string,
  // ) {
  //   return this.userService.disconnectSocialAcount(
  //     addSocialAcountInput,
  //     userId,
  //   );
  // }
}
