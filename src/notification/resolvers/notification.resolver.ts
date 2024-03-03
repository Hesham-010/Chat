import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { NotificationService } from '../services/notification.service';
import { DeviceInfoInput } from '../dtos/deviceInfo.input';
import { Notification } from '../models/notification.model';
import { DeviceInfo } from '../models/deviceInfo.model';
import { NotificationInput } from '../dtos/notification.input';

@Resolver()
export class NotificationResolver {
  constructor(private notificationService: NotificationService) {}

  // @Query(() => [Notification])
  // findAllNotification() {
  //   return this.notificationService.findAll();
  // }

  @Mutation(() => DeviceInfo)
  acceptPushNotification(
    @Args('Input')
    input: DeviceInfoInput,
  ) {
    return this.notificationService.acceptPushNotification(input);
  }

  @Mutation(() => DeviceInfo)
  disablePushNotification(
    @Args('input')
    input: DeviceInfoInput,
  ) {
    return this.notificationService.disablePushNotification(input);
  }

  // @Mutation(() => String)
  // seenOneNotification(@Args('notificationId') notificationId: string) {
  //   return this.notificationService.seenOneNotification(notificationId);
  // }

  // @Mutation(() => String)
  // seenNotifications() {
  //   return this.notificationService.seenNotifications();
  // }
}
