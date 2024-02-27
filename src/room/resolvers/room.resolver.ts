import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RoomService } from '../services/room.service';
import { Room } from '../entities/room.entity';
import { CreateRoomInput } from '../dto/create-room.input';
import { CurrentUser } from 'src/_common/decorators/currentUser';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/_common/guards/authGuard';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Room)
  getOrCreateRoom(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.roomService.getOrCreateRoom(createRoomInput, currentUser);
  }
}
