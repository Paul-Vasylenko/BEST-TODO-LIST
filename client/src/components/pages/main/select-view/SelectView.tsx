import * as React from 'react';
import { ITodo } from 'typings/ITodo';
import './select-view.scss';

interface SelectViewProps {
	todo: ITodo;
}

export const SelectView: React.FC<SelectViewProps> = ({ todo }) => {
	return <div className="modal">this is modal</div>;
};
