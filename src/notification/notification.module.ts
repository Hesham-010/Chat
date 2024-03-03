import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationResolver } from './resolvers/notification.resolver';
import { DeviceInfoProvider } from 'src/_common/providers/deviceInfo.provider';
import { NotificationProvider } from 'src/_common/providers/notification.provider';

@Module({
  imports: [],
  providers: [
    NotificationResolver,
    NotificationService,
    ...DeviceInfoProvider,
    ...NotificationProvider,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
