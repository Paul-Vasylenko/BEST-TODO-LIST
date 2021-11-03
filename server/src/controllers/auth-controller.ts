import { Response, NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../helpers';
import { authService } from '../services';

class AuthController {
	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.badRequest('Ошибка валидации', errors.array()));
			}
			const { email, password, name } = req.body;
			const userData = await authService.registration(email, password, name);
			if (!userData) {
				throw ApiError.badRequest('No userdata, line 11 auth-controller');
			}
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.json({ ...userData });
		} catch (e) {
			console.log(e);
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.badRequest('Ошибка валидации', errors.array()));
			}
			const { email, password } = req.body;
			const userData = await authService.login(email, password);
			if (!userData) {
				throw ApiError.badRequest('No userdata, line 11 auth-controller');
			}
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.json({ ...userData });
		} catch (e) {
			console.log(e);

			next(e);
		}
	}
	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			console.log(1);
		} catch (e) {
			console.log(e);
		}
	}
	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			console.log(1);
		} catch (e) {
			console.log(e);
		}
	}
	async activate(req: Request, res: Response, next: NextFunction) {
		try {
			console.log(1);
		} catch (e) {
			console.log(e);
		}
	}
}

export default new AuthController();
