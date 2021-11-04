export interface ITodo {
	id: string;
	title: string;
	description: string;
	isDone: boolean;
	tags: string;
	importanceLevel: number;
	deadline: Date;
}
