import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/auth-reducer';
import TodoReducer from './reducers/todo-reducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	todos: TodoReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
