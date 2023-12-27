import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { FriendShip } from 'src/friendship/entities/friendship.entity';
import { Verify } from 'src/auth/entities/verify.entity';
import { Message } from 'src/message/entities/message.entity';
import { Room } from 'src/room/entities/room.entity';
import { Social } from 'src/auth/entities/social.entity';

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
      sequelize.addModels([User, Message, FriendShip, Verify, Room, Social]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
