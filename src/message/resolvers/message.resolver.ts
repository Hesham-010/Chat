import { Resolver, Mutation, Args, Subscription, Query } from '@nestjs/graphql';
import { MessageService } from '../services/message.service';
import { Message } from '../entities/message.entity';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from 'src/_common/decorators/currentUser';
import { User } from 'src/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/_common/guards/authGuard';
import { SendMessageInput } from '../dtos/sendmessage.dto';

const pubsub = new PubSub();

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly chatService: MessageService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Message)
  async sendMessage(
    @Args('sendMessageInput') sendMessageInput: SendMessageInput,
    @CurrentUser() currentUser: User,
  ) {
    const message = await this.chatService.sendMessage(
      sendMessageInput,
      currentUser,
    );
    await pubsub.publish('SEND_MESSAGE', { message: message });
    return message;
  }

  @Subscription(() => Message)
  message() {
    return pubsub.asyncIterator('SEND_MESSAGE');
  }

  @UseGuards(AuthGuard)
  @Query(() => [Message])
  findAllMessages(
    @Args('receiverId') receiverId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.chatService.findAllMessages(receiverId, currentUser);
  }
}
