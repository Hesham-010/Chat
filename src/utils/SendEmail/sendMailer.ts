import { createTransport } from 'nodemailer';
import { html } from './mailTemplete';

export const sendEmail = (options) => {
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
    to: options.email,
    subject: options.subject,
    html: html(options.code),
  });
};
