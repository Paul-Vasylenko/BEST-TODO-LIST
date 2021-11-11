import { BasicForm } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sign-up.module.scss';
import './sign-up.scss';

interface ISignUpPage {
	onFinish: (values: any) => void;
	formElements: {
		email: boolean;
		username?: boolean;
		password: boolean;
		confirmPassword?: boolean;
	};
	error?: string;
	linkTo: string;
	textLink: string;
	header: string;
}

export const SignUpPage = ({
	onFinish,
	formElements,
	error = '',
	linkTo,
	textLink,
	header,
}: ISignUpPage): JSX.Element => {
	return (
		<div className={styles.container}>
			<div className={styles.signup}>
				<h2>{header}</h2>
				<BasicForm onFinish={onFinish} {...formElements} />
				<hr />
				<Link to={linkTo}>{textLink}</Link>
				<p>{error}</p>
			</div>
		</div>
	);
};
