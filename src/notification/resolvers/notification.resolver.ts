import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { NotificationService } from '../services/notification.service';
import { Notification_TokenInput } from '../dtos/notificationToken.input';
import { Notification } from '../models/notification.model';
import { Fcm_Token } from '../models/fcm_token.model';

@Resolver()
export class NotificationResolver {
  constructor(private notificationService: NotificationService) {}

  // @Query(() => [Notification])
  // findAllNotification() {
  //   return this.notificationService.findAll();
  // }

  // @Mutation(() => Fcm_Token)
  // acceptPushNotification(
  //   @Args('notification_TokenInput')
  //   notification_TokenInput: Notification_TokenInput,
  // ) {
  //   return this.notificationService.acceptPushNotification(
  //     notification_TokenInput.customerId,
  //     notification_TokenInput.notificationToken,
  //   );
  // }

  // @Mutation(() => NotificationToken)
  // disablePushNotification(
  //   @Args('customerId')
  //   customerId: string,
  // ) {
  //   return this.notificationService.disablePushNotification(customerId);
  // }

  // @Mutation(() => String)
  // seenOneNotification(@Args('notificationId') notificationId: string) {
  //   return this.notificationService.seenOneNotification(notificationId);
  // }

  // @Mutation(() => String)
  // seenNotifications() {
  //   return this.notificationService.seenNotifications();
  // }
}
