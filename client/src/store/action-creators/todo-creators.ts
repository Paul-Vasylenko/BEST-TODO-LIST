import { TodoService } from 'services/todo-service';
import { AppDispatch } from 'store';
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
