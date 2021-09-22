import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'common';

export const Routing: React.FC = () => (
	<Switch>
		<Route path={ROUTES.Main} exact></Route>
		<Route path={ROUTES.SignUp} exact></Route>
		<Route path={ROUTES.SignIn} exact></Route>
		<Redirect from="*" to={ROUTES.NotFound} />
	</Switch>
);
