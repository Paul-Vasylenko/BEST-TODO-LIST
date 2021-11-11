import { SignUpPage } from 'components';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { registration } from './../../store/action-creators/auth-creators';
import { useAppSelector } from 'hooks/useAppHooks';
import { ROUTES } from 'common';

export const SignUp = (): JSX.Element => {
	const dispatch = useDispatch();
	const onFinish = async (values: any) => {
		const formData: string[] = Object.values(values);
		dispatch(registration(formData[0], formData[2], formData[1]));
	};
	const { errors } = useAppSelector((store) => store.auth);
	const formElements = useMemo(
		() => ({
			email: true,
			username: true,
			password: true,
			confirmPassword: true,
		}),
		[],
	);
	return (
		<SignUpPage
			onFinish={onFinish}
			formElements={formElements}
			error={errors[0]}
			linkTo={ROUTES.SignIn}
			textLink="Sign in"
			header="Sign up"
		/>
	);
};
