import { AxiosResponse } from 'axios';
import { IUser } from 'typings/IUser';
import $api from '../helpers/http';

export class UserService {
	static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>('/user');
	}
}
