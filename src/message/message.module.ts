import { Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { MessageResolver } from './resolvers/message.resolver';
import { MessageProvider } from 'src/_common/providers/message.provider';
import { FrienshipProvider } from 'src/_common/providers/friendship.provider';

@Module({
  providers: [
    MessageResolver,
    MessageService,
    ...MessageProvider,
    ...FrienshipProvider,
  ],
})
export class MessageModule {}
