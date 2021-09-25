import React from 'react';
import { Input, Button, Form } from 'antd';
import { FormTypes } from 'common';

interface IFormItem {
	label?: string;
	name?: string;
	required?: boolean;
	type?: FormTypes;
	isSubmitButton?: boolean;
	submitButtonText?: string;
}

export const FormItem = ({
	label = '',
	name,
	required = true,
	type = FormTypes.TEXT,
	isSubmitButton = false,
	submitButtonText = 'Submit',
}: IFormItem): JSX.Element => {
	return !isSubmitButton ? (
		<Form.Item
			name={name}
			label={label}
			rules={[
				{
					required,
				},
			]}
		>
			{type === FormTypes.PASSWORD ? <Input.Password /> : <Input />}
		</Form.Item>
	) : (
		<Button type="primary" htmlType="submit">
			{submitButtonText}
		</Button>
	);
};
