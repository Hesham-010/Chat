import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('sendOTP') private sendOTPQueue: Queue) {}

  async sendOTP(email: string, subject: string, code: number) {
    await this.sendOTPQueue.add({ email, subject, code });
  }
}
