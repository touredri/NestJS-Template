/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailerService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: Number(this.configService.get('MAIL_PORT')),
      secure: false, // upgrade later with STARTTLS if needed
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<any> {
    const mailOptions = {
      from: this.configService.get('MAIL_FROM'),
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.debug(`Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      this.logger.error(`Error sending email: ${error.message}`);
      throw error;
    }
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const appPort = this.configService.get('APP_PORT');
    // Adjust the URL as necessary (include your domain, etc.)
    const verifyUrl = `http://localhost:${appPort}/auth/verify-email?token=${token}`;
    const subject = 'Verify Your Email';
    const text = `Welcome! Click the link below to verify your email:\n\n${verifyUrl}`;
    await this.sendEmail(email, subject, text);
  }

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const appPort = this.configService.get('APP_PORT');
    // Adjust the URL as necessary
    const resetUrl = `http://localhost:${appPort}/auth/reset-password?token=${token}`;
    const subject = 'Reset Your Password';
    const text = `You requested a password reset. Click below to reset your password:\n\n${resetUrl}`;
    await this.sendEmail(email, subject, text);
  }
}
