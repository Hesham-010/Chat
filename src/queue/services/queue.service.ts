import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('sendOTP') private sendOTPQueue: Queue,
    @InjectQueue('notification') private notificationQueue: Queue,
  ) {}

  async sendOTP(email: string, subject: string, code: number) {
    await this.sendOTPQueue.add({ email, subject, code });
  }

  async sendNotification(title, body, userIds) {
    await this.notificationQueue.add({ title, body, userIds });
  }
}
