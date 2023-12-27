import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Message } from '../entities/message.entity';
import { Op } from 'sequelize';
import { SendMessageInput } from '../dtos/sendmessage.dto';
import { FriendShip } from 'src/friendship/entities/friendship.entity';
import { FrienshipRequestEnum } from 'src/utils/enums/FrienshipRequest.enum';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_REPOSITORY') private chatRepository: typeof Message,
    @Inject('FRIENDSHIP_REPOSITORY')
    private friendshipRepository: typeof FriendShip,
  ) {}

  async sendMessage(sendMessageInput: SendMessageInput, user: string) {
    const friendship = await this.friendshipRepository.findOne({
      where: {
        [Op.or]: [
          {
            senderId: user,
            receiverId: sendMessageInput.receiverId,
            accepted: FrienshipRequestEnum.ACCEPT,
          },
          {
            senderId: sendMessageInput.receiverId,
            receiverId: user,
            accepted: FrienshipRequestEnum.ACCEPT,
          },
        ],
      },
    });
    if (!friendship) {
      return new NotFoundException(
        'This user is not a friend please send friendship request to this user',
      );
    }

    const message = await this.chatRepository.create({
      senderId: user,
      ...sendMessageInput,
    });
    return message;
  }

  async findAllMessages(receiverId: string, user: User) {
    const chat = await this.chatRepository.findAll({
      where: {
        [Op.or]: [
          { senderId: user.id, receiverId },
          { senderId: receiverId, receiverId: user.id },
        ],
      },
    });

    return chat;
  }
}
