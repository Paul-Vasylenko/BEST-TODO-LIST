import { NextFunction, Request, Response } from 'express';
import { User } from '../../data/models';
import { ApiError } from '../../helpers';

class UserService {
	async create(req: Request, next: NextFunction) {
		try {
			const { name, email, password } = req.body;
			const user = await User.create({ name, email, password });
			return user;
		} catch (e) {
			return next(ApiError.badRequest('Can`t create user'));
		}
	}

	async getAll(req: Request, next: NextFunction) {
		try {
			return await User.findAll();
		} catch (e) {
			return next(ApiError.badRequest('Can`t get users'));
		}
	}

	async getOne(req: Request, next: NextFunction) {
		try {
			return await User.findByPk(req.params.id);
		} catch (e) {
			return next(ApiError.badRequest('Can`t get user'));
		}
	}

	async deleteOne(req: Request, next: NextFunction) {
		try {
			const userToDelete = await User.findByPk(req.params.id);
			if (!userToDelete) {
				return ApiError.badRequest("Can't delete unexisting user");
			}
			return await userToDelete.destroy();
		} catch (e) {
			return next(ApiError.badRequest('Can`t delete user'));
		}
	}
	async updateOne(req: Request, next: NextFunction) {
		try {
			const userToUpdate: any = await User.findByPk(req.params.id);
			if (!userToUpdate) {
				return ApiError.badRequest("Can't update unexisting user");
			}
			const { name, email, password } = req.body;
			if (name) {
				userToUpdate.name = name;
			}
			if (email) {
				userToUpdate.email = email;
			}
			if (password) {
				userToUpdate.password = password;
			}
			return await userToUpdate.save();
		} catch (e) {
			return next(ApiError.badRequest('Can`t delete user'));
		}
	}
}

export default new UserService();
