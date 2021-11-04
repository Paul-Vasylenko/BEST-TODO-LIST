import { SignUpPage } from 'components';
import { useAppSelector } from 'hooks/useAppHooks';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'store/action-creators/auth-creators';
import { ROUTES } from './../../common/enums/routes';

interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
	const dispatch = useDispatch();
	const onFinish = async (values: any) => {
		const formData: string[] = Object.values(values);
		dispatch(login(formData[0], formData[1]));
	};
	const { errors } = useAppSelector((store) => store.auth);
	const formElements = useMemo(
		() => ({
			email: true,
			password: true,
		}),
		[],
	);
	return (
		<SignUpPage
			onFinish={onFinish}
			formElements={formElements}
			error={errors[0]}
			linkTo={ROUTES.SignUp}
			textLink="Sign up"
			header="Sign in"
		/>
	);
};

export default SignIn;
