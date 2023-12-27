import { Inject, Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DataLoaderService {
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}

  userDataLoader() {
    return new DataLoader(async (userIds) => {
      const userIdsSet = new Set(userIds);

      const uniqueUserIds = Array.from(userIdsSet);
      console.log(uniqueUserIds);
      const users = await this.userRepository.findAll({
        where: { id: uniqueUserIds },
      });

      const userObj = {};
      users.forEach((user) => {
        userObj[user.id] = user;
      });

      return userIds.map((userId: any) => userObj[userId]);
    });
  }
}
