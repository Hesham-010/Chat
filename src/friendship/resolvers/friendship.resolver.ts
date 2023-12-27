import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { FriendshipService } from '../services/friendship.service';
import { FriendShip } from '../entities/friendship.entity';
import { CurrentUser } from 'src/_common/decorators/currentUser';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/_common/guards/authGuard';
import { User } from 'src/user/entities/user.entity';
import { PubSub } from 'graphql-subscriptions';
import { IDataLoader } from 'src/dataloader/dataloader.interface';

const pubsub = new PubSub();

@Resolver(() => FriendShip)
export class FriendshipResolver {
  constructor(private readonly friendshipService: FriendshipService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => FriendShip)
  async sendFriendrequest(
    @Args('receiverId') receiverId: string,
    @CurrentUser() user: String,
  ) {
    const request = await this.friendshipService.sendRequest(receiverId, user);
    await pubsub.publish('SEND_REQUEST', { sendRequest: request });
    return request;
  }

  @Subscription(() => FriendShip)
  sendRequest() {
    return pubsub.asyncIterator('SEND_REQUEST');
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FriendShip)
  acceptFriendshipRequest(
    @Args('userId') userId: string,
    @CurrentUser() user: String,
  ) {
    return this.friendshipService.acceptRequest(userId, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FriendShip)
  rejectFriendshipRequest(
    @Args('userId') userId: string,
    @CurrentUser() user: String,
  ) {
    return this.friendshipService.rejectRequest(userId, user);
  }

  @UseGuards(AuthGuard)
  @Query(() => [FriendShip])
  findfriendshipRequests(@CurrentUser() user: String) {
    return this.friendshipService.findFriendshipsRequests(user);
  }

  @UseGuards(AuthGuard)
  @Query(() => [User])
  findFriendsForUser(@CurrentUser() user: String) {
    return this.friendshipService.findAllFriends(user);
  }

  @ResolveField()
  userSender(@Parent() friendShip, @Context('loaders') loaders: IDataLoader) {
    return loaders.userLoader.load(friendShip.senderId);
  }

  @ResolveField()
  userReceiver(@Parent() friendShip, @Context('loaders') loaders: IDataLoader) {
    return loaders.userLoader.load(friendShip.receiverId);
  }
}
