/** @format */

import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_POST,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Activating an account on the ${process.env.API_URL} site`,
      text: '',
      html: `
		<div>
		<h1>To activate click on the link</h1>
		<a href="${link}">${link}</a>
		</div>
		`,
    });
  }
}

const mailService = new MailService();

export { mailService };
