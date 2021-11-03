import jwt from 'jsonwebtoken';
import { ENV } from '../../common';
import { IToken, Token, User } from '../../data/models';

class TokenService {
	generateTokens(payload: Record<string, any>) {
		const accessToken = jwt.sign(payload, ENV.JWT.SECRET_ACCESS, {
			expiresIn: '15m',
		});
		const refreshToken = jwt.sign(payload, ENV.JWT.SECRET_REFRESH, {
			expiresIn: '30d',
		});
		return {
			accessToken,
			refreshToken,
		};
	}
	verifyAccessToken(token: string) {
		try {
			return jwt.verify(token, ENV.JWT.SECRET_ACCESS);
		} catch (e) {
			return null;
		}
	}
	verifyRefreshToken(token: string) {
		try {
			return jwt.verify(token, ENV.JWT.SECRET_REFRESH);
		} catch (e) {
			return null;
		}
	}
	async saveToken(userId: string, refreshToken: string) {
		const tokenData: any = await Token.findOne({ where: { userId } });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return await tokenData.save();
		}
		return await Token.create(
			{
				refreshToken,
				userId,
			},
			{ include: User },
		);
	}
}

export default new TokenService();
