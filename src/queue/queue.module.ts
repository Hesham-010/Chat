import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NotificationConsumer } from './consumer/notification.consumer';
import { QueueResolver } from './resolvers/queue.resolver';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'notification',
    }),
  ],
  providers: [NotificationConsumer, QueueResolver],
})
export class QueueModule {}
