import { Routing } from 'containers/routing';
import React from 'react';
import { Router } from 'react-router-dom';
import history from 'helpers/history.helper';
import { Provider } from 'react-redux';
import store from 'redux/store';

export const App = () => (
	<Provider store={store}>
		<Router history={history}>
			<Routing />
		</Router>
	</Provider>
);
