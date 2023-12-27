import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { FriendShip } from '../entities/friendship.entity';
import { Op } from 'sequelize';
import { FrienshipRequestEnum } from 'src/utils/enums/FrienshipRequest.enum';

@Injectable()
export class FriendshipService {
  constructor(
    @Inject('FRIENDSHIP_REPOSITORY')
    private friendshipRepository: typeof FriendShip,
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
  ) {}

  async sendRequest(receiverId: string, user: String) {
    const existRequest = await this.friendshipRepository.findOne({
      where: {
        [Op.or]: [
          { senderId: user, receiverId },
          { senderId: receiverId, receiverId: user },
        ],
      },
    });
    if (existRequest) {
      return new BadRequestException('This request already exist');
    }

    const request = await this.friendshipRepository.create({
      senderId: user,
      receiverId,
    });
    return request;
  }

  async acceptRequest(userId: string, user: String) {
    const request = await this.friendshipRepository.update(
      { accepted: FrienshipRequestEnum.ACCEPT },
      {
        where: { senderId: userId, receiverId: user },
        returning: true,
      },
    );
    return request[1][0];
  }

  async rejectRequest(userId: string, user: String) {
    const request = await this.friendshipRepository.update(
      { accepted: FrienshipRequestEnum.REJECT },
      {
        where: { senderId: userId, receiverId: user },
        returning: true,
      },
    );
    return request[1][0];
  }

  async findFriendshipsRequests(user: String) {
    const frindshipsRequests = await this.friendshipRepository.findAll();

    return frindshipsRequests;
  }

  async findAllFriends(user: String) {
    const friendships = await this.friendshipRepository.findAll({
      where: { [Op.or]: [{ senderId: user }, { receiverId: user }] },
    });

    const friendsIds = friendships.map((friendship) =>
      friendship.senderId === user
        ? friendship.receiverId
        : friendship.senderId,
    );
    const users = await this.userRepository.findAll({
      where: { id: friendsIds },
    });
    return users;
  }
}
