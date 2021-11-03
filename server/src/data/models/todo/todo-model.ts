import sequelize from '../../../config';
import { User } from '..';
import { DataTypes } from 'sequelize';

export const Todo = sequelize.define('todo', {
	id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
	title: { type: DataTypes.STRING },
	description: { type: DataTypes.STRING },
	isDone: { type: DataTypes.BOOLEAN },
});

export interface ITodo {
	id: string;
	title: string;
	description: string;
	isDone: boolean;
}
