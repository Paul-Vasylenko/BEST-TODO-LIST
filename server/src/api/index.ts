import { apiPath } from '../common';
import { Router } from 'express';
import { initUserApi } from './user-api';
import { initTodoApi } from './todo-api';

export function initApi(): Router {
	const apiRouter = Router();

	apiRouter.use(apiPath.USER, initUserApi());

	apiRouter.use(apiPath.TODO, initTodoApi());

	return apiRouter;
}
