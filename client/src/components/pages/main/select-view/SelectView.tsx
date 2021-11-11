import * as React from 'react';
import { ITodo } from 'typings/ITodo';
import './select-view.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';

interface SelectViewProps {
	todo: ITodo;
	onClose: () => void;
	onDelete: (v: ITodo) => void;
	onSave: (v: ITodo) => void;
}

export const SelectView: React.FC<SelectViewProps> = ({
	todo,
	onClose,
	onDelete,
	onSave,
}) => {
	const [titleEditable, setTitleEditable] = React.useState<boolean>(false);
	const [descriptionEditable, setDescriptionEditable] =
		React.useState<boolean>(false);
	const [tagsEditable, setTagsEditable] = React.useState(false);

	const [title, setTitle] = React.useState(todo.title); //optimization
	const [description, setDescription] = React.useState(todo.description);
	const [tags, setTags] = React.useState(todo.tags);
	const [isDone, setIsDone] = React.useState(todo.isDone);
	return (
		<div
			className="modal"
			onKeyPress={(e) => {
				if (e.key === 'Enter') {
					setTitleEditable(false);
					setDescriptionEditable(false);
					setTagsEditable(false);
				}
			}}
			tabIndex={0}
		>
			<label>Title</label>
			{titleEditable ? (
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					autoFocus
				/>
			) : (
				<p onClick={() => setTitleEditable(true)}>{title}</p>
			)}
			<label>Description</label>
			{descriptionEditable ? (
				<input
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					autoFocus
				/>
			) : (
				<p onClick={() => setDescriptionEditable(true)}>
					{description}
				</p>
			)}
			<label>Tags:</label>
			{tagsEditable ? (
				<input
					value={tags}
					onChange={(e) => setTags(e.target.value)}
					autoFocus
				/>
			) : (
				<p onClick={() => setTagsEditable(true)}>{tags}</p>
			)}
			<Checkbox
				checked={isDone}
				onChange={(e) => setIsDone(e.target.checked)}
			/>
			<CloseCircleOutlined onClick={onClose} />
			<Button
				type="primary"
				onClick={() => {
					const resultTodo: ITodo = {
						...todo,
						title,
						description,
						tags,
						isDone,
					};
					onSave(resultTodo);
					onClose();
				}}
			>
				Save
			</Button>
			<Button
				type="primary"
				danger
				onClick={() => {
					onDelete(todo);
					onClose();
				}}
			>
				Delete
			</Button>
			<Button type="link" danger onClick={onClose}>
				Don&apos;t save
			</Button>
		</div>
	);
};
