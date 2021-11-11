import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers';
import tokenService from '../services/token-service/token-service';

export function authMiddleware(req: Request & { user?: any }, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			next(ApiError.Unathorized());
		}
		const accessToken = authorizationHeader?.split(' ')[1];
		if (!accessToken) {
			next(ApiError.Unathorized());
		}
		const userData = tokenService.verifyAccessToken(accessToken ?? '');
		if (!userData) {
			next(ApiError.Unathorized());
		}

		req.user = userData;
		next();
	} catch (e) {
		next(ApiError.Unathorized());
	}
}
