import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';

import { env } from '../env';
import * as orgQueries from '../queries/organization.queries';
import type { CreatedEmail } from '../types/email';
import { logger } from '../utils/logger';

interface SmtpConfig {
	host: string;
	port: string;
	mailFrom: string;
	password: string;
	ssl: boolean;
}

class EmailService {
	private transporter: Transporter | undefined = undefined;
	private enabled: boolean = false;
	private mailFrom: string = '';

	constructor() {
		this.applySmtpConfig({
			host: env.SMTP_HOST ?? '',
			port: env.SMTP_PORT ?? '587',
			mailFrom: env.SMTP_MAIL_FROM ?? '',
			password: env.SMTP_PASSWORD ?? '',
			ssl: env.SMTP_SSL === 'true',
		});
	}

	private applySmtpConfig(config: SmtpConfig) {
		if (!config.host || !config.mailFrom || !config.password) {
			this.transporter = undefined;
			this.enabled = false;
			this.mailFrom = '';
			return;
		}

		try {
			this.transporter = nodemailer.createTransport({
				host: config.host,
				port: Number(config.port) || 587,
				secure: config.ssl,
				auth: {
					user: config.mailFrom,
					pass: config.password,
				},
			});

			this.enabled = true;
			this.mailFrom = config.mailFrom;
		} catch (error) {
			logger.error(`Failed to initialize email transporter: ${String(error)}`, { source: 'system' });
			this.transporter = undefined;
			this.enabled = false;
			this.mailFrom = '';
		}
	}

	public async reloadSmtpConfig(): Promise<void> {
		const config = await orgQueries.getSmtpConfig();
		this.applySmtpConfig(config);
	}

	public isEnabled(): boolean {
		return this.enabled;
	}

	public async sendEmail(to: string, email: CreatedEmail): Promise<void> {
		if (!this.isEnabled() || !this.transporter) {
			return;
		}

		try {
			await this.transporter.sendMail({
				from: this.mailFrom,
				to,
				subject: email.subject,
				html: email.html,
			});
		} catch (error) {
			logger.error(`Failed to send email to ${to}: ${String(error)}`, { source: 'system', context: { to } });
		}
	}
}

// Singleton instance of the email service
export const emailService = new EmailService();
