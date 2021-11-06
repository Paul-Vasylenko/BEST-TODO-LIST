import $api from 'helpers/http';
import { AxiosResponse } from 'axios';
import { ITodo } from './../typings/ITodo';

export class TodoService {
	static async fetchTodos(userId: string): Promise<AxiosResponse<ITodo[]>> {
		return $api.get<ITodo[]>('/todo/user/' + userId);
	}
	static async deleteTodo(todoId: string): Promise<AxiosResponse<ITodo>> {
		return $api.delete<ITodo>('/todo/' + todoId);
	}
	static async updateTodo(
		todoId: string,
		todoBody: ITodo,
	): Promise<AxiosResponse<ITodo>> {
		return $api.put<ITodo>('/todo/' + todoId, todoBody);
	}
}
