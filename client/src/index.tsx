import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from 'containers/app';
import { Provider } from 'react-redux';
import { setupStore } from 'store';

const store = setupStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
