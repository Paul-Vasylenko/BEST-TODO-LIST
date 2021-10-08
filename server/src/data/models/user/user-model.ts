import sequelize from '../../../config';
import { DataTypes } from 'sequelize';
import { Todo } from '../todo';

export const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
});

User.hasMany(Todo);
Todo.belongsTo(User);
