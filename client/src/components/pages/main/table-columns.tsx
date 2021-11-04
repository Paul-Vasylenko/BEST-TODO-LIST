import React from 'react';
import { Tag, Tooltip } from 'antd';
import { ImportanceLevel } from 'components/basic/importance-level';

export const columns = [
	{
		title: 'Importance Level',
		dataIndex: 'importanceLevel',
		key: 'importanceLevel',
		render: (level: number) => (
			<ImportanceLevel key={level} level={level} />
		),
		width: 110,
	},
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'title',
		width: 180,
		ellipsis: {
			showTitle: false,
		},
		render: (address: string) => (
			<Tooltip placement="topLeft" title={address}>
				{address}
			</Tooltip>
		),
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		width: 400,
		ellipsis: {
			showTitle: false,
		},
		render: (address: string) => (
			<Tooltip placement="topLeft" title={address}>
				{address}
			</Tooltip>
		),
	},
	{
		title: 'Tags',
		dataIndex: 'tags',
		key: 'tags',
		render: (tags: string[]) => (
			<>
				{tags.map((tag) => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'world') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: 'Deadline',
		dataIndex: 'deadline',
		key: 'deadline',
	},
];
