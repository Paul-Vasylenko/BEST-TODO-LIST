import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ENV } from '../../common';
import { ApiError } from '../../helpers';

class MailService {
	private getTransporter() {
		return createTransport({
			host: ENV.EMAIL.HOST,
			port: ENV.EMAIL.PORT,
			secure: false,
			auth: {
				user: ENV.EMAIL.ADRESS,
				pass: ENV.EMAIL.PASSWORD,
			},
		} as SMTPTransport.MailOptions);
	}
	private async sendMail(options: Mail.Options) {
		try {
			const transport = this.getTransporter();
			await transport.sendMail(options);
			return { success: true };
		} catch (error) {
			throw ApiError.internal("Can't send mail :(");
		}
	}
	public async sendActivationMail(to: string, activationLink: string) {
		const result = await this.sendMail({
			from: ENV.EMAIL.ADRESS,
			to,
			subject: 'Activation of account ' + ENV.APP.SERVER_URL,
			html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${activationLink}">${activationLink}</a>
                </div>
            `,
		});
		return result;
	}
}

export const mailService = new MailService();
