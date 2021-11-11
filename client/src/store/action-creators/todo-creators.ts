import { TodoService } from 'services/todo-service';
import { AppDispatch } from 'store';
import { ITodo } from 'typings/ITodo';
import { TodoSlice } from './../reducers/todo-reducer';

export const fetchTodos = (userId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(TodoSlice.actions.setIsLoading(true));
		const response = await TodoService.fetchTodos(userId);
		dispatch(TodoSlice.actions.setFetchedTodos(response.data));
	} catch (e: any) {
		dispatch(TodoSlice.actions.setErrors(e.message));
	} finally {
		dispatch(TodoSlice.actions.setIsLoading(false));
	}
};

export const deleteTodo = (todoId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(TodoSlice.actions.setIsLoading(true));
		await TodoService.deleteTodo(todoId);
	} catch (e: any) {
		dispatch(TodoSlice.actions.setErrors(e.message));
	} finally {
		dispatch(TodoSlice.actions.setIsLoading(false));
	}
};

export const updateTodo =
	(todoId: string, todoBody: ITodo) => async (dispatch: AppDispatch) => {
		try {
			dispatch(TodoSlice.actions.setIsLoading(true));
			await TodoService.updateTodo(todoId, todoBody);
		} catch (e: any) {
			dispatch(TodoSlice.actions.setErrors(e.message));
		} finally {
			dispatch(TodoSlice.actions.setIsLoading(false));
		}
	};
