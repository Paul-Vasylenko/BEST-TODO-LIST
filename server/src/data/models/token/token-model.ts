import { DataTypes } from 'sequelize';
import { User } from '..';
import sequelize from '../../../config';

export const Token = sequelize.define('token', {
	id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
	refreshToken: { type: DataTypes.STRING(1000), allowNull: false },
	userId: {
		type: DataTypes.UUID,
		references: {
			model: 'users',
			key: 'id',
		},
	},
});

export interface IToken {
	id: string;
	refreshToken: string;
}
