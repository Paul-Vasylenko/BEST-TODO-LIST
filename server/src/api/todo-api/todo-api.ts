import { Router } from 'express';
import { todoApiPath } from '../../common';
import { todoService } from './../../services/todo-service/todo-service';
import { authMiddleware } from './../../middleware/authMiddleware';

export function initTodoApi(): Router {
	const todoRouter = Router();

	todoRouter
		.get(todoApiPath.ALL, (req, res, next) => {
			todoService
				.getAll()
				.then((result) => res.send(result))
				.catch(next);
		})
		.get(todoApiPath.ONE, (req, res, next) => {
			todoService
				.getOne(req.params.id)
				.then((result) => res.send(result))
				.catch(next);
		})
		.get(todoApiPath.USER_ID, authMiddleware, (req, res, next) => {
			todoService
				.getAllByUserId(req.params.userId)
				.then((user) => res.send(user))
				.catch(next);
		})
		.post(todoApiPath.ALL, (req, res, next) => {
			todoService
				.create(req.body)
				.then((result) => res.send(result))
				.catch(next);
		})
		.put(todoApiPath.ONE, (req, res, next) => {
			todoService
				.updateOne(req.params.id, req.body)
				.then((result) => res.send(result))
				.catch(next);
		})
		.delete(todoApiPath.ONE, (req, res, next) => {
			todoService
				.deleteOne(req.params.id)
				.then((result) => res.send(result))
				.catch(next);
		});
	return todoRouter;
}
