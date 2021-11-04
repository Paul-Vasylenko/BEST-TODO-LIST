import { Table } from 'antd';
import * as React from 'react';
import { ITodo } from 'typings/ITodo';
import './main-page.scss';
import { SelectView } from './select-view';
import ClickAwayListener from 'react-click-away-listener';

interface MainPageProps {
	columns: IColumn[];
	done: IDataSource[];
	notDone: IDataSource[];
	name: string;
	onRowClick: (arg1: IDataSource, arg2?: number) => any | void;
	selected: ITodo | null;
	onClickAway: () => void;
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
}) => {
	return (
		<>
			<div className={selected ? 'opacity' : ''}>
				<div>
					<h1>Hi, {name}!</h1>
					<p>
						Create, update and delete your working plans to have
						everything done in time!
					</p>
					<hr />
				</div>
				Todo:
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
				Done:
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
				<ClickAwayListener onClickAway={() => onClickAway()}>
					<SelectView todo={selected} />
				</ClickAwayListener>
			) : null}
		</>
	);
};

export default MainPage;
