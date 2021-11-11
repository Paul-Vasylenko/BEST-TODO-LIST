import UserDto from './../../dtos/user-dto';

export interface IAuthResponse {
	refreshToken: string;
	accessToken: string;
	user: UserDto;
}
