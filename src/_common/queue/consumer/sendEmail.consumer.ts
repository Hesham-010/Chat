import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { html } from 'src/utils/SendEmail/mailTemplete';
import { createTransport } from 'nodemailer';

@Processor('sendOTP')
export class NotificationConsumer {
  constructor() {}

  @Process()
  async sendOTP(job: Job) {
    const transporter = createTransport({
      service: 'gmail',
      host: 'stmp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'heshamelshamy010@gmail.com',
        pass: 'opretvtzupsuimgf',
      },
    });

    transporter.sendMail({
      from: 'Chat App',
      to: job.data.email,
      subject: job.data.subject,
      html: html(job.data.code),
    });
  }
}
