import { Module } from '@nestjs/common';
import { FriendshipService } from './services/friendship.service';
import { FriendshipResolver } from './resolvers/friendship.resolver';
import { UserProvider } from 'src/_common/providers/user.provider';
import { FrienshipProvider } from 'src/_common/providers/friendship.provider';

@Module({
  providers: [
    FriendshipResolver,
    FriendshipService,
    ...UserProvider,
    ...FrienshipProvider,
  ],
})
export class FriendshipModule {}
