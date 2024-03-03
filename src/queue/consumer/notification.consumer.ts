import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import * as FCM from 'fcm-node';
import { DeviceInfo } from 'src/notification/models/deviceInfo.model';
import { Notification } from 'src/notification/models/notification.model';
import { NotificationStatus } from 'src/notification/notification_status.enum';

@Processor('notification')
export class NotificationConsumer {
  constructor(
    @Inject('DEVICE_INFO_REPOSITORY') private deviceInfoRepo: typeof DeviceInfo,
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepo: typeof Notification,
  ) {}

  @Process()
  async sendNotification(job: Job) {
    try {
      const { title, body, userIds } = job.data;
      const serverKey = process.env.SERVER_KEY;

      const fcm = new FCM(serverKey);

      const deviceInfos = await this.deviceInfoRepo.findAll({
        where: {
          userId: userIds,
          status: NotificationStatus.ACTIVE,
        },
      });

      const reg_Ids = [];
      deviceInfos.forEach((deviceInfo) => {
        reg_Ids.push(deviceInfo.fcm_Token);
      });

      if (reg_Ids.length > 0) {
        const message = {
          registration_ids: reg_Ids,
          content_available: true,
          mutable_content: true,
          notification: {
            title,
            body,
            sound: 'default',
            click_action: 'FCM_PLUGIN_ACTIVITY',
            icon: 'fcm_push_icon',
          },
        };

        fcm.send(message, async (err, response) => {
          if (response) {
            // create notification in notification model
            const messageData = deviceInfos.map((deviceInfo) => {
              return {
                title: message.notification.title,
                body: message.notification.body,
                userId: deviceInfo.userId,
              };
            });
            await this.notificationRepo.bulkCreate(messageData);
          } else {
            return err;
          }
        });
      }
    } catch (err) {
      console.log('errs', err);
    }
  }
}
