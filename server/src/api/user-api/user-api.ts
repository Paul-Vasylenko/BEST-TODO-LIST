import { userApiPath } from './../../common/api/userApiPath';
import { Router } from 'express';

export function initUserApi(): Router {
	const userRouter = Router();
	userRouter.get(userApiPath.ALL, (req, res) => {
		res.send('users work');
	});
	return userRouter;
}
