import { DataTypes } from 'sequelize';
import sequelize from '../../../config';
import { Todo } from '../todo';
import { Token } from '../token';

export const User = sequelize.define('user', {
	id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
	name: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
	activationLink: { type: DataTypes.STRING },
});

User.hasMany(Todo, {
	onDelete: 'cascade',
});

Todo.belongsTo(User, {
	foreignKey: {
		allowNull: false,
	},
});
User.hasOne(Token, {
	onDelete: 'cascade',
});

Token.belongsTo(User, {
	foreignKey: {
		allowNull: false,
	},
});

export interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	isActivated: boolean;
	activationLink: string;
}
