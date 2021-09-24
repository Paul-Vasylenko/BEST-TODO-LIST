import { BasicForm } from 'components/common/basic-form/BasicForm';
import React from 'react';

export const SignUp = (): JSX.Element => {
	const onFinish = (values: any) => {
		console.log(Object.values(values));
	};
	const formElements = {
		email: true,
		username: true,
		password: true,
		confirmPassword: true,
	};
	return (
		<div>
			<BasicForm onFinish={onFinish} {...formElements} />
		</div>
	);
};
