import express from 'express';
import { initApi } from './api';
import { ENV } from './common';
import './data/db/connection';
import './data/models';
import { ErrorHandlingMiddleware } from './middleware';
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = ENV.APP.PORT || 5000;

const app = express();
app.use(cors({ credentials: true, origin: ENV.APP.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());

app.use(ENV.APP.API_PATH, initApi());
app.use(ErrorHandlingMiddleware);
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
