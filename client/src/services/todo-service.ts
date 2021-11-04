import $api from 'helpers/http';
import { AxiosResponse } from 'axios';
import { ITodo } from './../typings/ITodo';

export class TodoService {
	static async fetchTodos(userId: string): Promise<AxiosResponse<ITodo[]>> {
		return $api.get<ITodo[]>('/todo/user/' + userId);
	}
}
