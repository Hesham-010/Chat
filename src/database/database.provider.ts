import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { FriendShip } from 'src/friendship/entities/friendship.entity';
import { Verify } from 'src/auth/entities/verify.entity';
import { Message } from 'src/message/entities/message.entity';
import { Room } from 'src/room/entities/room.entity';
import { Notification } from 'src/notification/models/notification.model';
import { DeviceInfo } from 'src/notification/models/deviceInfo.model';

export const DatabaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATA_BASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      });
      sequelize.addModels([
        User,
        Message,
        FriendShip,
        Verify,
        Room,
        Notification,
        DeviceInfo,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
