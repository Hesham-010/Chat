import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationResolver } from './resolvers/notification.resolver';

@Module({
  imports: [],
  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
