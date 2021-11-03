import { User } from '../../data/models';
import { ApiError } from '../../helpers';
import { hash, compare } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { userService } from './../user-service';
import UserDto from './../../dtos/user-dto';
import tokenService from '../token-service/token-service';
import { mailService } from '../';
import { apiPath, ENV } from '../../common';
import { IAuthResponse } from '../../data/models/auth-response';

class AuthService {
	async registration(email: string, password: string, name: string): Promise<IAuthResponse | void> {
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			throw ApiError.badRequest('User exists');
		}
		const hashPassword = await hash(password, 3);
		const activationLink = uuid();
		const user = await userService.create({ email, password: hashPassword, name, activationLink });
		if (!user) {
			throw ApiError.badRequest('Can`t create user');
		}
		try {
			await mailService.sendActivationMail(
				email,
				`${ENV.APP.SERVER_URL}${ENV.APP.API_PATH}${apiPath.AUTH}/activate/${activationLink}`,
			);
		} catch (e) {
			throw ApiError.badRequest('Email error');
		}
		const userDto = new UserDto({
			email: user.getDataValue('email'),
			id: user.getDataValue('id'),
			isActivated: user.getDataValue('isActivated'),
			name: user.getDataValue('name'),
			activationLink: user.getDataValue('activationLink'),
		});
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return {
			...tokens,
			user: userDto,
		};
	}
	async login(email: string, password: string): Promise<IAuthResponse | void> {
		const existingUser = await User.findOne({ where: { email } });
		if (!existingUser) {
			throw ApiError.badRequest('User doen`t exists');
		}
		const isPassEqual = await compare(password, existingUser.getDataValue('password'));
		if (!isPassEqual) {
			throw ApiError.badRequest('Пароли не совпадают');
		}
		const userDto = new UserDto({
			email: existingUser.getDataValue('email'),
			id: existingUser.getDataValue('id'),
			isActivated: existingUser.getDataValue('isActivated'),
			name: existingUser.getDataValue('name'),
			activationLink: existingUser.getDataValue('activationLink'),
		});
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return {
			...tokens,
			user: userDto,
		};
	}
	async logout() {
		try {
			console.log(1);
		} catch (e) {
			console.log(e);
		}
	}
	async refresh(refreshToken: string) {
		try {
			console.log(1);
		} catch (e) {
			console.log(e);
		}
	}
	async activate(activationLink: string) {
		try {
			console.log(1);
		} catch (e) {
			console.log(e);
		}
	}
}

export const authService = new AuthService();
