import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { verifyToken } from './utils/token';
import { FriendshipModule } from './friendship/friendship.module';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { DataloaderModule } from './dataloader/dataloader.module';
import { DataLoaderService } from './dataloader/services/dataloader.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      inject: [DataLoaderService],
      useFactory: (dataLoaderService: DataLoaderService) => ({
        autoSchemaFile: true,
        installSubscriptionHandlers: true,
        subscriptions: {
          'subscriptions-transport-ws': {
            onConnect: async (connectionParams) => {
              const authToken = connectionParams.authorization.split(' ')[1];
              if (!verifyToken(authToken)) {
                throw new Error('Token is not valid');
              }
              const user = await verifyToken(authToken);
              return user;
            },
          },
        },
        context: () => ({
          loaders: {
            userLoader: dataLoaderService.userDataLoader(),
          },
        }),
      }),
    }),
    UserModule,
    MessageModule,
    DatabaseModule,
    AuthModule,
    FriendshipModule,
    RoomModule,
    DataloaderModule,
  ],
  providers: [],
})
export class AppModule {}
