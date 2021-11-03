import { Response, NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';
import { ENV } from '../common';
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
			next(e);
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
			next(e);
		}
	}
	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const result = await authService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(result);
		} catch (e) {
			next(e);
		}
	}
	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const data = await authService.refresh(refreshToken);
			if (!data) {
				throw ApiError.badRequest('No data, auth-controller 63 line');
			}
			res.cookie('refreshToken', data.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.json({ ...data });
		} catch (e) {
			next(e);
		}
	}
	async activate(req: Request, res: Response, next: NextFunction) {
		try {
			const { link } = req.params;
			await authService.activate(link);
			return res.redirect(ENV.APP.CLIENT_URL);
		} catch (e) {
			next(e);
		}
	}
}

export default new AuthController();
