import { getEnv } from '../../../helpers/index';

const variables = process.env;

const ENV = {
	APP: {
		PORT: getEnv('PORT'),
	},
	DB: {
		NAME: getEnv('DB_NAME'),
		USER: getEnv('DB_USER'),
		PASSWORD: getEnv('DB_PASSWORD'),
		HOST: getEnv('DB_HOST'),
		PORT: getEnv('DB_PORT'),
	},
};

export { ENV };
