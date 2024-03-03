import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { QueueService } from '../services/queue.service';

@Resolver()
export class QueueResolver {
  constructor(private readonly queueService: QueueService) {}
  @Mutation(() => String)
  sendNotification(
    @Args('title') title: string,
    @Args('body') body: string,
    @Args('userIds', { type: () => [String] }) userIds: string[],
  ) {
    return this.queueService.sendNotification(title, body, userIds);
  }
}
