import { IUser, User } from '../../data/models';
import { ApiError } from '../../helpers';
import { hash, compare } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { userService } from './../user-service';
import UserDto from './../../dtos/user-dto';
import tokenService from '../token-service/token-service';
import { mailService } from '../';
import { apiPath, ENV } from '../../common';
import { IAuthResponse } from '../../data/models/auth-response';
import { JwtPayload } from 'jsonwebtoken';

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
	async logout(refreshToken: string) {
		await tokenService.removeToken(refreshToken);
		return { removed: true, refreshToken };
	}
	async refresh(refreshToken: string): Promise<IAuthResponse | void> {
		if (!refreshToken) {
			throw ApiError.badRequest('No refresh token');
		}
		const data: any = tokenService.verifyRefreshToken(refreshToken);
		const tokenFromDB = await tokenService.findToken(refreshToken);
		if (!data && !tokenFromDB) {
			throw ApiError.Unathorized();
		}
		const user = await User.findOne({ where: { id: data.id } });
		if (!user) {
			throw ApiError.Unathorized();
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
	async activate(activationLink: string) {
		const user: any = await User.findOne({ where: { activationLink } });
		if (!user) {
			throw ApiError.badRequest('No user with this activation link');
		}
		user.isActivated = true;
		return await user.save();
	}
}

export const authService = new AuthService();
