import { ITodo, Todo } from '../../data/models';
import { ApiError } from '../../helpers';

class TodoService {
	async create(todoOptions: ITodo) {
		try {
			const todo = await Todo.create({ ...todoOptions });
			return todo;
		} catch (e) {
			console.log(e);
		}
	}
	async getAll() {
		try {
			return await Todo.findAll();
		} catch (e) {
			console.log(e);
		}
	}
	async getAllByUserId(userId: string) {
		try {
			return await Todo.findAll({ where: { userId } });
		} catch (e) {
			console.log(e);
		}
	}
	async getOne(id: string) {
		try {
			return await Todo.findByPk(id);
		} catch (e) {
			console.log(e);
		}
	}
	async deleteOne(id: string) {
		try {
			const todoToDelete = await Todo.findByPk(id);
			if (!todoToDelete) {
				return ApiError.badRequest("Can't delete unexisting todo");
			}
			await todoToDelete.destroy();
			return todoToDelete;
		} catch (e) {
			console.log(e);
		}
	}
	async updateOne(id: string, newTodo: Record<string, any>) {
		try {
			const todoToUpdate: any = await Todo.findByPk(id);
			if (!todoToUpdate) {
				return ApiError.badRequest("Can't update unexisting user");
			}
			for (const item in newTodo) {
				if (item) {
					todoToUpdate[item] = newTodo[item];
				}
			}
			return await todoToUpdate.save();
		} catch (e) {
			console.log(e);
		}
	}
}

export const todoService = new TodoService();
