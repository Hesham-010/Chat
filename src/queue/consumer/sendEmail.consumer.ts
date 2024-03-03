import { Process, Processor } from '@nestjs/bull';
import { createTransport } from 'nodemailer';
import { html } from '../../utils/SendEmail/mailTemplete';
import { Job } from 'bull';

@Processor()
export class EmailConsumer {
  @Process()
  async sendEmail(job: Job) {
    try {
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
        from: 'Star',
        to: job.data.email,
        subject: 'Verify Code',
        html: html(job.data.otp),
      });
    } catch (err) {
      return err;
    }
  }
}
