// eslint-disable-next-line import/extensions
import { getEnv } from '../../../helpers/index';

const variables = process.env;

const ENV = {
	APP: {
		PORT: getEnv('PORT'),
		API_PATH: getEnv('API_PATH'),
		CLIENT_URL: getEnv('CLIENT_URL'),
		SERVER_URL: getEnv('SERVER_URL'),
	},
	DB: {
		NAME: getEnv('DB_NAME'),
		USER: getEnv('DB_USER'),
		PASSWORD: getEnv('DB_PASSWORD'),
		HOST: getEnv('DB_HOST'),
		PORT: getEnv('DB_PORT'),
	},
	JWT: {
		SECRET_ACCESS: getEnv('JWT_ACCESS_SECRET'),
		SECRET_REFRESH: getEnv('JWT_REFRESH_SECRET'),
	},
	EMAIL: {
		ADRESS: getEnv('EMAIL_ADRESS'),
		PASSWORD: getEnv('EMAIL_PASSWORD'),
		PORT: getEnv('SMTP_PORT'),
		HOST: getEnv('SMTP_HOST'),
	},
};

export { ENV };
