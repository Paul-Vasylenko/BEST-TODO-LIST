import { Token, User } from '../../data/models';
import { ApiError } from '../../helpers';
import { Todo } from './../../data/models/todo/todo-model';

class UserService {
	async create({
		name,
		email,
		password,
		activationLink,
	}: {
		name: string;
		email: string;
		password: string;
		activationLink: string;
	}) {
		try {
			const user = await User.create({ name, email, password, activationLink });
			return user;
		} catch (e) {
			console.log(e);
		}
	}

	async getAll() {
		try {
			return await User.findAll({
				include: [Token, Todo],
			});
		} catch (e) {
			console.log(e);
		}
	}

	async getOne(id: string) {
		try {
			return await User.findByPk(id);
		} catch (e) {
			console.log(e);
		}
	}

	async deleteOne(id: string) {
		try {
			const userToDelete = await User.findByPk(id);
			if (!userToDelete) {
				return ApiError.badRequest("Can't delete unexisting user");
			}
			await userToDelete.destroy();
			return userToDelete;
		} catch (e) {
			console.log(e);
		}
	}
	async updateOne(id: string, newUser: Record<string, any>) {
		try {
			const userToUpdate: any = await User.findByPk(id);
			if (!userToUpdate) {
				return ApiError.badRequest("Can't update unexisting user");
			}
			for (const item in newUser) {
				if (item) {
					userToUpdate[item] = newUser[item];
				}
			}
			return await userToUpdate.save();
		} catch (e) {
			console.log(e);
		}
	}
}

export const userService = new UserService();
