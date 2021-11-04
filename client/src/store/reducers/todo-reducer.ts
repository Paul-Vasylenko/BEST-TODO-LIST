import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from './../../typings/ITodo';

export interface ITodosState {
	isLoading: boolean;
	errors: any[];
	done: ITodo[];
	notDone: ITodo[];
    selected: ITodo|null;
}

const initialState: ITodosState = {
	isLoading: false,
	errors: [],
	done: [],
	notDone: [],
    selected: null,
};

export const TodoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setFetchedTodos: (state, action: PayloadAction<ITodo[]>) => {
			state.errors = [];
			const done = action.payload.filter((todo) => todo.isDone);
			const notDone = action.payload.filter((todo) => !todo.isDone);
			state.done = done;
			state.notDone = notDone;
		},
		setErrors: (state, action: PayloadAction<string>) => {
			state.errors = [action.payload];
		},
        selectTodo: (state, action: PayloadAction<ITodo|null>) => {
			state.selected = action.payload;
		},
	},
});

export default TodoSlice.reducer;
