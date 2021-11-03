import { RequestHandler } from 'express';
import { ApiError } from '../helpers';

export function ErrorHandlingMiddleware(err: any, req: any, res: any, next: any): RequestHandler {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors });
	}
	return res.status(500).json({ message: 'Unexpected error' });
}
