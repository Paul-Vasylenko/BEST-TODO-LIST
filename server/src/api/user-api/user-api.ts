import { userApiPath } from './../../common/api/userApiPath';
import { Router } from 'express';
import { userService } from '../../services';

export function initUserApi(): Router {
	const userRouter = Router();
	userRouter
		.get(userApiPath.ALL, (req, res, next) => {
			userService
				.getAll()
				.then((users) => res.send(users))
				.catch(next);
		})
		.get(userApiPath.ONE, (req, res, next) => {
			userService
				.getOne(req.params.id)
				.then((user) => res.send(user))
				.catch(next);
		})
		.post(userApiPath.ALL, (req, res, next) => {
			userService
				.create(req.body)
				.then((createdUser) => res.send(createdUser))
				.catch(next);
		})
		.put(userApiPath.ONE, (req, res, next) => {
			userService
				.updateOne(req.params.id, req.body)
				.then((updatedUser) => res.send(updatedUser))
				.catch(next);
		})
		.delete(userApiPath.ONE, (req, res, next) => {
			userService
				.deleteOne(req.params.id)
				.then((deletedUser) => res.send(deletedUser))
				.catch(next);
		});
	return userRouter;
}
