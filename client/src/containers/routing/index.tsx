import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'common';
import { useDispatch } from 'react-redux';
import * as userActions from 'containers/user/logic/actions';
import { UserData } from 'containers/user/logic/state';
import { SignUp } from 'containers/sign-up';

export const Routing: React.FC = () => {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(userActions.setLoading({ userData: UserData.LOADED }));
	};
	return (
		<Switch>
			<Route path={ROUTES.Main} exact>
				<button onClick={handleClick}>gogogo</button>
			</Route>
			<Route path={ROUTES.SignUp} exact>
				<SignUp />
			</Route>
			<Route path={ROUTES.SignIn} exact></Route>
			<Redirect from="*" to={ROUTES.NotFound} />
		</Switch>
	);
};
