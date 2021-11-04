import React, { useEffect } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from 'helpers/history.helper';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks/useAppHooks';
import { checkAuth } from 'store/action-creators/auth-creators';
import { ROUTES } from 'common';
import { SignUp } from 'containers/sign-up';
import SignIn from 'containers/sign-in/SignIn';
import Main from 'containers/main/Main';

export const App: React.FC = () => {
	const dispatch = useDispatch();
	const { isAuth, isLoading } = useAppSelector((store) => store.auth);
	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
		}
	}, []);
	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (isAuth) {
		return (
			<Router history={history}>
				<Switch>
					<Route path={ROUTES.Main} exact>
						<Main />
					</Route>
					<Redirect from="*" to={ROUTES.Main} />
				</Switch>
			</Router>
		);
	} else {
		return (
			<Router history={history}>
				<Switch>
					<Route path={ROUTES.SignUp} exact>
						<SignUp />
					</Route>
					<Route path={ROUTES.SignIn} exact>
						<SignIn />
					</Route>
					<Redirect from="*" to={ROUTES.SignUp} />
				</Switch>
			</Router>
		);
	}
};
