import React from 'react';
import { Form, Input } from 'antd';
import { FormItem } from 'components/basic/form-item/FormItem';
import { FormTypes } from 'common';

interface IBasicForm {
	email?: boolean;
	username?: boolean;
	password?: boolean;
	confirmPassword?: boolean;
	onFinish: (values: any) => void;
	submitButtonText?: string;
	needsSubmit?: boolean;
}

export const BasicForm = ({
	username = false,
	email = false,
	password = false,
	confirmPassword = false,
	onFinish,
	submitButtonText = 'Submit',
	needsSubmit = true,
}: IBasicForm): JSX.Element => {
	const validateMessages = {
		required: '${label} is required!',
		types: {
			email: '${label} is not a valid email!',
			number: '${label} is not a valid number!',
		},
		number: {
			range: '${label} must be between ${min} and ${max}',
		},
	};
	return (
		<Form
			autoComplete="off"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			onFinish={onFinish}
			validateMessages={validateMessages}
		>
			{email ? (
				<FormItem
					name="email"
					label="Email"
					required={true}
					type={FormTypes.EMAIL}
				/>
			) : null}
			{username ? (
				<FormItem
					name="username"
					label="Username"
					required={true}
					type={FormTypes.TEXT}
				/>
			) : null}
			{password ? (
				<FormItem
					name="password"
					label="Password"
					required={true}
					type={FormTypes.PASSWORD}
				/>
			) : null}
			{confirmPassword ? (
				<Form.Item
					name="confirm"
					label="Confirm Password"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							type: 'string',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (
									!value ||
									getFieldValue('password') === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error(
										'The two passwords that you entered do not match!',
									),
								);
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>
			) : null}
			{needsSubmit ? (
				<FormItem
					isSubmitButton={true}
					submitButtonText={submitButtonText}
				/>
			) : null}
		</Form>
	);
};
