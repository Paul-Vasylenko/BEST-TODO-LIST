import MainPage, { IDataSource } from 'components/pages/main/MainPage';
import { columns } from 'components/pages/main/table-columns';
import { useAppSelector } from 'hooks/useAppHooks';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodos } from 'store/action-creators/todo-creators';
import { TodoSlice } from 'store/reducers/todo-reducer';
import { ITodo } from 'typings/ITodo';
interface MainProps {}

const Main: React.FC<MainProps> = () => {
	const { name } = useAppSelector((store) => store.auth.user);
	const dispatch = useDispatch();
	const { user } = useAppSelector((store) => store.auth);
	const { selected } = useAppSelector((store) => store.todos);
	useEffect(() => {
		dispatch(fetchTodos(user.id));
	}, []);
	const { done, notDone, isLoading } = useAppSelector((store) => store.todos);
	const onRowClick = (record: IDataSource, index?: number) => {
		const todo: ITodo = {
			...record,
			id: record.key,
			tags: record.tags.join(','),
		};
		dispatch(TodoSlice.actions.selectTodo(todo));
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
		/>
	);
};

export default Main;

const mapTodosToData = (todos: ITodo[]): IDataSource[] => {
	return todos.map((todo) => {
		return {
			key: todo.id,
			title: todo.title,
			description: todo.description,
			importanceLevel: todo.importanceLevel,
			tags: todo.tags.split(','),
			isDone: todo.isDone,
			deadline: todo.deadline,
		};
	});
};
