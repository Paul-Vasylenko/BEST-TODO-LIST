import express from 'express';
import { ENV } from './common';
import './data/db/connection';
import './data/models';
const PORT = ENV.APP.PORT || 5000;
const app = express();

const start = async () => {
	try {
		app.listen(PORT, () => {
			console.log('Server is listening on port ' + PORT);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
