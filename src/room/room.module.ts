import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { RoomResolver } from './resolvers/room.resolver';
import { Roomprovider } from 'src/_common/providers/room.provider';
import { FrienshipProvider } from 'src/_common/providers/friendship.provider';

@Module({
  providers: [RoomResolver, RoomService, ...Roomprovider, ...FrienshipProvider],
})
export class RoomModule {}
