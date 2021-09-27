import sequelize from '../../../config';
import { DataTypes } from 'sequelize';
import { User } from '../user';

export const Todo = sequelize.define('todo', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING },
	description: { type: DataTypes.STRING },
	isDone: { type: DataTypes.BOOLEAN },
	//userId
});
