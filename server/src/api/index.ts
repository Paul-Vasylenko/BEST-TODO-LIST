import { apiPath } from '../common';
import { Router } from 'express';
import { initUserApi } from './user-api';
import { initTodoApi } from './todo-api';
import { initAuthApi } from './auth-api';

export function initApi(): Router {
	const apiRouter = Router();

	apiRouter.use(apiPath.USER, initUserApi());

	apiRouter.use(apiPath.TODO, initTodoApi());

	apiRouter.use(apiPath.AUTH, initAuthApi());

	return apiRouter;
}
