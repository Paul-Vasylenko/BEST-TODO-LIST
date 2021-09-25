import { BasicForm } from 'components';
import React from 'react';
import styles from './sign-up.module.scss';
import './sign-up.scss';

interface ISignUpPage {
	onFinish: (values: any) => void;
	formElements: {
		email: boolean;
		username: boolean;
		password: boolean;
		confirmPassword: boolean;
	};
}

export const SignUpPage = ({
	onFinish,
	formElements,
}: ISignUpPage): JSX.Element => {
	return (
		<div className={styles.container}>
			<div className={styles.signup}>
				<h2>Sign up</h2>
				<BasicForm onFinish={onFinish} {...formElements} />
			</div>
		</div>
	);
};
