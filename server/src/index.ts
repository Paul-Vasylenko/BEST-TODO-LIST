import express from 'express';
import { initApi } from './api';
import { ENV } from './common';
import './data/db/connection';
import './data/models';
const cors = require('cors');

const PORT = ENV.APP.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(ENV.APP.API_PATH, initApi());

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
