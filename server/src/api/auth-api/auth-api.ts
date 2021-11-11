import { Router } from 'express';
import { authApiPath } from '../../common';
import authController from '../../controllers/auth-controller';
import { body } from 'express-validator';

export function initAuthApi(): Router {
	const authRouter = Router();
	authRouter.post(
		authApiPath.REGISTRATION,
		body('email').isEmail(),
		body('password').isLength({ max: 32, min: 3 }),
		authController.registration,
	);
	authRouter.post(
		authApiPath.LOGIN,
		body('email').isEmail(),
		body('password').isLength({ max: 32, min: 3 }),
		authController.login,
	);
	authRouter.post(authApiPath.LOGOUT, authController.logout);
	authRouter.get(authApiPath.REFRESH, authController.refresh);
	authRouter.get(authApiPath.ACTIVATE, authController.activate);
	return authRouter;
}
