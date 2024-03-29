import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomInput } from '../dto/create-room.input';
import { User } from 'src/user/entities/user.entity';
import { Room } from '../entities/room.entity';
import { FriendShip } from 'src/friendship/entities/friendship.entity';
import { Op } from 'sequelize';

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOM_REPOSITORY') private roomRepository: typeof Room,
    @Inject('FRIENDSHIP_REPOSITORY')
    private friendshipRepository: typeof FriendShip,
  ) {}

  async getOrCreateRoom(createRoomInput: CreateRoomInput, currentUser: User) {
    const friendship = await this.friendshipRepository.findOne({
      where: {
        [Op.or]: [
          { senderId: currentUser.id, receiverId: createRoomInput.receiver },
          { senderId: createRoomInput.receiver, receiverId: currentUser.id },
        ],
      },
    });
    if (!friendship) {
      return new NotFoundException(
        'This user is not a friend please send friendship request to this user',
      );
    }

    const room = await this.roomRepository.findOne({
      where: { senderId: currentUser.id, receiverId: createRoomInput.receiver },
    });

    if (!room) {
      const room = await this.roomRepository.create({
        senderId: currentUser.id,
        receiverId: createRoomInput.receiver,
      });
      return room;
    }
    return room;
  }
}
