import { userApiPath } from './../../common/api/userApiPath';
import { Router } from 'express';
import { UserService } from '../../services';

export function initUserApi(): Router {
	const userRouter = Router();
	userRouter
		.get(userApiPath.ALL, (req, res, next) => {
			UserService.getAll(req, next)
				.then((users) => res.send(users))
				.catch(next);
		})
		.get(userApiPath.ONE, (req, res, next) => {
			UserService.getOne(req, next)
				.then((user) => res.send(user))
				.catch(next);
		})
		.post(userApiPath.ALL, (req, res, next) => {
			UserService.create(req, next)
				.then((createdUser) => res.send(createdUser))
				.catch(next);
		})
		.put(userApiPath.ONE, (req, res, next) => {
			UserService.updateOne(req, next)
				.then((updatedUser) => res.send(updatedUser))
				.catch(next);
		})
		.delete(userApiPath.ONE, (req, res, next) => {
			UserService.deleteOne(req, next)
				.then((deletedUser) => res.send(deletedUser))
				.catch(next);
		});
	return userRouter;
}
