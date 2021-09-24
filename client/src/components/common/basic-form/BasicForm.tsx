import React from 'react';
import { Form, Input, Button } from 'antd';

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
	return (
		<Form autoComplete="off" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
			{email ? (
				<Form.Item
					name={['user', 'email']}
					label="Email"
					rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
				>
					<Input />
				</Form.Item>
			) : null}
			{username ? (
				<Form.Item
					label="Username"
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>
			) : null}
			{password ? (
				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>
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
							message: 'Please confirm your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('The two passwords that you entered do not match!'));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>
			) : null}
			{needsSubmit ? (
				<Form.Item>
					<Button type="primary" htmlType="submit">
						{submitButtonText}
					</Button>
				</Form.Item>
			) : null}
		</Form>
	);
};
