import sequelize from '../../../config';
import { DataTypes } from 'sequelize';

export const Todo = sequelize.define('todo', {
	id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
	title: { type: DataTypes.STRING },
	description: { type: DataTypes.STRING },
	tags: { type: DataTypes.STRING, defaultValue: '' },
	importanceLevel: { type: DataTypes.INTEGER, defaultValue: 3 },
	isDone: { type: DataTypes.BOOLEAN },
	deadline: { type: DataTypes.DATEONLY },
});
//1-not important
//2-medium
//3-very important
export interface ITodo {
	id: string;
	title: string;
	description: string;
	isDone: boolean;
	tags: string;
	importanceLevel: number;
	deadline: DataTypes.DateOnlyDataType;
}
