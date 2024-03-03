import { Inject, Injectable } from '@nestjs/common';
import { Notification } from '../models/notification.model';
import { NotificationInput } from '../dtos/notification.input';
import { DeviceInfo } from '../models/deviceInfo.model';
import { DeviceType, NotificationStatus } from '../notification_status.enum';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import {
  CreateDeviceInfoInput,
  DeviceInfoInput,
} from '../dtos/deviceInfo.input';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('DEVICE_INFO_REPOSITORY') private deviceInfoRepo: typeof DeviceInfo,
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepo: typeof Notification,
  ) {}

  async acceptPushNotification(input: DeviceInfoInput): Promise<Boolean> {
    const { deviceType, fcm_Token } = input;
    const updateDeviceinfo = await this.deviceInfoRepo.update(
      {
        status: NotificationStatus.ACTIVE,
      },
      {
        where: {
          fcm_Token,
          deviceType,
        },
        returning: true,
      },
    );

    return true;
  }

  async disablePushNotification(input: DeviceInfoInput): Promise<Boolean> {
    const deviceInfo = await this.deviceInfoRepo.update(
      {
        status: NotificationStatus.INACTIVE,
      },
      {
        where: { deviceType: input.deviceType, fcm_Token: input.fcm_Token },
        returning: true,
      },
    );

    if (!deviceInfo)
      throw new BaseHttpException(ErrorCodeEnum.INVALID_DEVICE_TOKEN);

    return true;
  }

  // async sendPushNotification(notificationInput: NotificationInput) {
  //   const { title, body, userId } = notificationInput;

  //   const deviceInfo = await this.deviceInfoRepo.findAll({
  //     where: {
  //       userId,
  //       status: NotificationStatus.ACTIVE,
  //     },
  //   });

  //   if (!deviceInfo)
  //     throw new BaseHttpException(ErrorCodeEnum.INVALID_DEVICE_TOKEN);

  //   let fcm_Tokens = [];
  //   for (let i = 0; i < deviceInfo.length; i++) {
  //     fcm_Tokens.push(deviceInfo[i].fcm_Token);
  //   }

  //   try {
  //     await this.queueService.sendNotification(title, body, fcm_Tokens);
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   return await this.notificationRepo.create({
  //     userId,
  //     title,
  //     body,
  //   });
  // }

  // async findAll() {
  //   return this.notificationRepo.find();
  // }

  // async seenOneNotification(id: string) {
  //   const notification = await this.notificationRepo.update(id, {
  //     seen: true,
  //   });
  //   if (notification.affected) return 'Success';
  // }

  // async seenNotifications() {
  //   const notifications = await this.notificationRepo.update(
  //     {},
  //     { seen: true },
  //   );
  //   if (notifications.affected) return 'Success';
  // }

  async createDeviceInfoForLogin(input: CreateDeviceInfoInput) {
    return await this.deviceInfoRepo.create({ ...input });
  }
}
