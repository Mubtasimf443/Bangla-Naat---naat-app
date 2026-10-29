// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrevoClient } from '@getbrevo/brevo';
import { escapeHtml } from '../common/utils/text.util';

@Injectable()
export class MailService {
  private readonly brevo: BrevoClient;
  private readonly sender: { name: string; email: string };

  constructor(private readonly config: ConfigService) {
    this.brevo = new BrevoClient({ apiKey: this.config.getOrThrow<string>('BREVO_API_KEY') });
    this.sender = {
      name: this.config.get<string>('MAIL_SENDER_NAME', 'Bangla Naat'),
      email: this.config.getOrThrow<string>('MAIL_SENDER_EMAIL'),
    };
  }

  async sendVerificationEmail(to: string, name: string, link: string) {
    await this.send(
      to,
      name,
      'Verify your email - Bangla Naat',
      this.template(
        `Assalamu Alaikum, ${escapeHtml(name)}`,
        'Thank you for registering. Please confirm your email address to activate your account.',
        'Verify Email',
        link,
        'This link expires in 24 hours. If you did not create an account, you can ignore this email.',
      ),
    );
  }

  async sendPasswordResetEmail(to: string, name: string, link: string) {
    await this.send(
      to,
      name,
      'Confirm your new password - Bangla Naat',
      this.template(
        `Assalamu Alaikum, ${escapeHtml(name)}`,
        'We received a request to change your password. Click the button below to confirm and apply the new password you entered in the app.',
        'Set New Password',
        link,
        'This link expires in 1 hour. If you did not request this, you can ignore this email and your password will stay the same.',
      ),
    );
  }

  private async send(to: string, name: string, subject: string, htmlContent: string) {
    await this.brevo.transactionalEmails.sendTransacEmail({
      subject,
      htmlContent,
      sender: this.sender,
      to: [{ email: to, name }],
    });
  }

  private template(title: string, body: string, buttonText: string, link: string, footer: string) {
    return `<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;border:1px solid #e4e4e7;border-radius:12px">
<h2 style="color:#166534">${title}</h2>
<p style="color:#3f3f46;line-height:1.6">${body}</p>
<p style="text-align:center;margin:28px 0"><a href="${link}" style="background:#166534;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">${buttonText}</a></p>
<p style="color:#71717a;font-size:13px">If the button does not work, copy this link into your browser:<br>${link}</p>
<p style="color:#71717a;font-size:13px">${footer}</p></div>`;
  }
}
