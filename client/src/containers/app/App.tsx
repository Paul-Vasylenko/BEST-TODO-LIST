import { Routing } from 'containers/routing';
import React from 'react';
import { Router } from 'react-router-dom';
import history from 'helpers/history.helper';
import './App.css';

export const App = () => (
	<Router history={history}>
		<Routing />
	</Router>
);
