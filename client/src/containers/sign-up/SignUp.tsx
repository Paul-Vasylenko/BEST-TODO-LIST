import { SignUpPage } from 'components';
import React, { useMemo } from 'react';

export const SignUp = (): JSX.Element => {
	const onFinish = (values: any) => {
		console.log(Object.values(values));
	};
	const formElements = useMemo(
		() => ({
			email: true,
			username: true,
			password: true,
			confirmPassword: true,
		}),
		[],
	);
	return <SignUpPage onFinish={onFinish} formElements={formElements} />;
};
