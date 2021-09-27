import { ENV } from '../common';
import { Sequelize } from 'sequelize';

export default new Sequelize(ENV.DB.NAME, ENV.DB.USER, ENV.DB.PASSWORD, {
	dialect: 'postgres',
	host: ENV.DB.HOST,
	port: +ENV.DB.PORT,
});
