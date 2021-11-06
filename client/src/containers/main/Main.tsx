import MainPage, { IDataSource } from 'components/pages/main/MainPage';
import { columns } from 'components/pages/main/table-columns';
import { useAppSelector } from 'hooks/useAppHooks';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	deleteTodo,
	fetchTodos,
	updateTodo,
} from 'store/action-creators/todo-creators';
import { TodoSlice } from 'store/reducers/todo-reducer';
import { ITodo } from 'typings/ITodo';
interface MainProps {}

const Main: React.FC<MainProps> = () => {
	const { name } = useAppSelector((store) => store.auth.user);
	const dispatch = useDispatch();
	const { user } = useAppSelector((store) => store.auth);
	const { selected, done, notDone, isLoading } = useAppSelector(
		(store) => store.todos,
	);
	useEffect(() => {
		dispatch(fetchTodos(user.id));
	}, []);
	const onRowClick = (record: IDataSource, index?: number) => {
		const todo: ITodo = {
			...record,
			id: record.key,
			tags: record.tags.join(','),
		};
		dispatch(TodoSlice.actions.selectTodo(todo));
	};
	const onDelete = (todo: ITodo) => {
		dispatch(TodoSlice.actions.deleteFromDone(todo));
		dispatch(TodoSlice.actions.deleteFromNotDone(todo));
		dispatch(deleteTodo(todo.id));
	};
	const onSave = (todo: ITodo) => {
		const thisTodoInDone = done.find((item) => item.id === todo.id);
		const thisTodoInNotDone = notDone.find((item) => item.id === todo.id);
		if (thisTodoInDone) {
			if (thisTodoInDone.isDone === !todo.isDone) {
				dispatch(TodoSlice.actions.deleteFromDone(todo));
				dispatch(TodoSlice.actions.insertToNotDone(todo));
			} else {
				dispatch(TodoSlice.actions.updateInDone(todo));
			}
		}
		if (thisTodoInNotDone) {
			if (thisTodoInNotDone.isDone === !todo.isDone) {
				dispatch(TodoSlice.actions.deleteFromNotDone(todo));
				dispatch(TodoSlice.actions.insertToDone(todo));
			} else {
				dispatch(TodoSlice.actions.updateInNotDone(todo));
			}
		}
		dispatch(updateTodo(todo.id, todo));
	};
	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	return (
		<MainPage
			columns={columns}
			name={name}
			done={mapTodosToData(done)}
			notDone={mapTodosToData(notDone)}
			onRowClick={onRowClick}
			onClickAway={() => dispatch(TodoSlice.actions.selectTodo(null))}
			selected={selected}
			onDelete={onDelete}
			onSave={onSave}
		/>
	);
};

export default Main;

const mapTodosToData = (todos: ITodo[]): IDataSource[] => {
	return todos.map((todo) => {
		return {
			...todo,
			key: todo.id,
			tags: todo.tags.split(','),
		};
	});
};

export const mapDataToTodo = (data: IDataSource): ITodo => {
	return {
		...data,
		id: data.key,
		tags: data.tags.join(','),
	};
};
