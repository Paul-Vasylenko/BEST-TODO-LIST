import { Router } from 'express';
import { todoApiPath } from '../../common';

export function initTodoApi(): Router {
	const todoRouter = Router();

	todoRouter.get(todoApiPath.ALL, (req, res) => {
		res.send('todos work!');
	});

	return todoRouter;
}
