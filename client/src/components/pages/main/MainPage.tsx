import { Table } from 'antd';
import { useOutsideClick } from 'hooks/useOutsideClick';
import * as React from 'react';
import { useRef } from 'react';
import { ITodo } from 'typings/ITodo';
import './main-page.scss';
import { SelectView } from './select-view';

interface MainPageProps {
	columns: IColumn[];
	done: IDataSource[];
	notDone: IDataSource[];
	name: string;
	onRowClick: (arg1: IDataSource, arg2?: number) => any | void;
	selected: ITodo | null;
	onClickAway: () => void;
	onDelete: (v: ITodo) => void;
	onSave: (v: ITodo) => void;
}

export interface IDataSource {
	key: string;
	title: string;
	description: string;
	importanceLevel: number;
	tags: string[];
	deadline: Date;
	isDone: boolean;
}

interface IColumn {
	title: string;
	dataIndex: string;
	key: string;
}

const MainPage: React.FC<MainPageProps> = ({
	name,
	columns,
	done,
	notDone,
	onRowClick,
	selected,
	onClickAway,
	onDelete,
	onSave,
}) => {
	const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
	useOutsideClick(ref, () => {
		if (selected) {
			onClickAway();
		}
	});
	return (
		<>
			<div className="main">
				<div className="header">
					<h1>Hi, {name}!</h1>
					<p>
						Create, update and delete your working plans to have
						everything done in time!
					</p>
				</div>
				<hr />
				<p className="section-header">Todo:</p>
				<Table
					columns={columns}
					dataSource={notDone}
					pagination={{ position: ['bottomCenter'] }}
					onRow={(record, rowIndex) => ({
						onClick: (e) => {
							onRowClick(record, rowIndex);
						},
					})}
				/>
				<p className="section-header">Done:</p>
				<Table
					columns={columns}
					dataSource={done}
					pagination={{ position: ['bottomCenter'] }}
					onRow={(record, rowIndex) => ({
						onClick: (e) => {
							onRowClick(record, rowIndex);
						},
					})}
				/>
			</div>
			{selected ? (
				<>
					<div className="opacity"></div>
					<div ref={ref}>
						<SelectView
							todo={selected}
							onClose={onClickAway}
							onDelete={onDelete}
							onSave={onSave}
						/>
					</div>
				</>
			) : null}
		</>
	);
};

export default MainPage;
